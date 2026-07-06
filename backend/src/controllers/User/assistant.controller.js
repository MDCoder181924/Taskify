import { GoogleGenAI } from "@google/genai";
import task from "../../models/User/addTask.js";
import user from "../../models/Auth/userAuth.models.js";

export const chatWithAssistant = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Message is required and must be a string."
      });
    }

    // 1. Check if the API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        success: false,
        message: "GEMINI_API_KEY is not configured in backend/.env. Please add your Gemini API key to start using the AI Assistant."
      });
    }

    // 2. Fetch User info and Tasks for Context Injection
    const userId = req.user.userId;
    const userObj = await user.findById(userId);
    const userTasks = await task.find({ userId });

    // Format tasks for the prompt context
    const taskListStr = userTasks && userTasks.length > 0 
      ? userTasks.map((t, idx) => `${idx + 1}. Title: "${t.taskTitle}", Category: "${t.taskCategory || 'General'}", Priority: "${t.taskPriority}", Status: "${t.taskStatus}", Due Date: ${t.taskDueDate ? new Date(t.taskDueDate).toDateString() : 'None'}`).join('\n')
      : 'No tasks currently exist in the database.';

    const userName = userObj ? (userObj.fullName || userObj.userName) : 'User';
    const currentTime = new Date().toString();

    // 3. Build System Instruction for a personalized experience
    const systemInstructionText = `You are Taskify's Neural AI Productivity Assistant.
The logged-in user's name is "${userName}".
The current system date/time is: ${currentTime}.

Here is the current task list of the user from the database:
${taskListStr}

Guidelines:
1. Always be professional, clear, concise, and helpful. Use a premium, tech-focused, yet warm tone.
2. If the user asks about their tasks, deadlines, priorities, or categories, use the real-time database tasks listed above to answer accurately.
3. If they ask to add, edit, or delete tasks, guide them nicely that they can do so using the "My Tasks" or Kanban Board screen, or by clicking the floating Action button on the screen.
4. Keep answers brief (typically 1-3 paragraphs) to match a chat UI bubble. Use markdown formatting (like bolding, bullet points) to make responses readable.
5. If the user makes queries unrelated to productivity/tasks, you can still answer them briefly but gently steer them back to managing their tasks if appropriate.`;

    // 4. Construct Prompt incorporating Chat History
    let historyStr = "";
    if (history && Array.isArray(history)) {
      history.forEach(h => {
        const sender = h.sender === 'user' ? 'User' : 'Assistant';
        const text = h.text || '';
        if (text.trim()) {
          historyStr += `${sender}: ${text}\n`;
        }
      });
    }
    const fullPrompt = `${historyStr}User: ${message}\nAssistant:`;

    // 5. Initialize GoogleGenAI SDK
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // 6. Make request to Gemini with fallback mechanisms for robust model availability
    let interaction;
    let chosenModel = "gemini-3.5-flash";

    try {
      interaction = await ai.interactions.create({
        model: chosenModel,
        input: fullPrompt,
        config: {
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          }
        }
      });
    } catch (err) {
      console.warn(`Failed with ${chosenModel}: ${err.message}. Trying gemini-2.5-flash fallback...`);
      chosenModel = "gemini-2.5-flash";
      try {
        interaction = await ai.interactions.create({
          model: chosenModel,
          input: fullPrompt,
          config: {
            systemInstruction: {
              parts: [{ text: systemInstructionText }]
            }
          }
        });
      } catch (err2) {
        console.warn(`Failed with ${chosenModel}: ${err2.message}. Trying gemini-1.5-flash fallback...`);
        chosenModel = "gemini-1.5-flash";
        interaction = await ai.interactions.create({
          model: chosenModel,
          input: fullPrompt,
          config: {
            systemInstruction: {
              parts: [{ text: systemInstructionText }]
            }
          }
        });
      }
    }

    const reply = interaction.output_text || "I was unable to formulate a response. Please check your query.";

    return res.status(200).json({
      success: true,
      reply,
      modelUsed: chosenModel
    });

  } catch (error) {
    console.error("AI Assistant Error:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while contacting the AI core.",
      error: error.message
    });
  }
};

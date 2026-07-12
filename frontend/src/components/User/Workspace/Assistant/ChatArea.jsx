import { useState, useEffect, useRef } from 'react';
import { Sparkles, History, MoreVertical, Send, Calendar, Clock, Terminal } from 'lucide-react';
import api from '../../../../api/axios';

export default function ChatArea() {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Good morning! I\'ve analyzed your upcoming week. You have 3 critical deadlines overlapping with deep work blocks. Would you like me to suggest a reallocation of these tasks to maximize your cognitive energy?',
      time: 'Just now'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Yes, please. Especially the project migration task. It feels like it\'s taking too much of my Friday.',
      time: 'Just now'
    },
    {
      id: 'msg-3',
      sender: 'assistant',
      text: 'Understood. Friday\'s capacity is currently at 115%. Based on your historical productivity peaks, I recommend moving the "Backend Migration Docs" to Wednesday morning at 9:00 AM.',
      time: 'Just now',
      recommendation: {
        title: 'Confirm Reallocation',
        details: 'Wednesday, Oct 24 • 09:00 AM',
        icon: Terminal
      }
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const textToSend = inputText.trim();
    if (!textToSend || isLoading) return;

    // Add user message
    const newUserMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };

    // Save previous messages context before updating
    const historyContext = [...messages, newUserMessage];

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    api.post("/user/assistant/chat", {
      message: textToSend,
      history: historyContext
    })
    .then((res) => {
      if (res.data && res.data.success) {
        const aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: res.data.reply,
          time: 'Just now'
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        const errorResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: res.data?.message || 'I encountered an unexpected issue formulating a response.',
          time: 'Just now'
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    })
    .catch((err) => {
      console.error("AI assistant API error:", err);
      const errMsg = err.response?.data?.message || 'Could not establish connection to the AI Core. Please verify if GEMINI_API_KEY is correctly set in backend/.env.';
      const errorResponse = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: errMsg,
        time: 'Just now'
      };
      setMessages(prev => [...prev, errorResponse]);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <section className="flex-1 flex flex-col relative px-6 lg:px-12 pb-6 z-10 max-w-4xl mx-auto w-full">
      
      {/* Top Header contexts */}
      <header className="h-16 flex items-center justify-between border-b border-outline-variant mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black shadow-[0_0_8px_#22c55e]" />
          </div>
          <h2 className="font-display font-extrabold text-on-surface text-base">
            AI Assistant 
            <span className="text-primary/70 font-mono text-[9px] ml-2 tracking-widest uppercase bg-primary/5 px-2 py-0.5 rounded border border-primary/10 font-bold">
              V4.2-NEURAL
            </span>
          </h2>
        </div>

        <div className="flex gap-2">
          <button 
            className="p-2 rounded-lg glass-card hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            onClick={() => alert('Accessing neural conversation history...')}
          >
            <History className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-lg glass-card hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            onClick={() => alert('Opening assistant options...')}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Chat scroll box */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 py-4 scroll-smooth">
        {messages.map((msg) => {
          const isAI = msg.sender === 'assistant';
          return (
            <div 
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${isAI ? 'items-start' : 'items-end self-end'}`}
            >
              <div className="flex items-center gap-2 mb-1.5 px-1.5">
                <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${isAI ? 'text-secondary/70' : 'text-primary/70'}`}>
                  {isAI ? 'Assistant' : 'You'}
                </span>
              </div>

              <div 
                className={
                  isAI 
                    ? 'text-on-surface text-xs font-sans font-medium leading-relaxed w-full' 
                    : 'p-3.5 px-5 rounded-2xl rounded-tr-none bg-primary/10 border border-primary/20 text-on-surface text-xs font-sans font-medium leading-relaxed'
                }
              >
                <p className="leading-relaxed">{msg.text}</p>

                {/* Confirm Reallocation interactive widget */}
                {isAI && msg.recommendation && (
                  <div className="mt-3.5 grid grid-cols-1 gap-2 max-w-md">
                    <div className="bg-surface rounded-xl p-3 border border-outline-variant flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-on-surface font-bold leading-none">{msg.recommendation.title}</p>
                          <p className="text-[9px] text-on-surface-variant/70 font-mono mt-1 font-bold">{msg.recommendation.details}</p>
                        </div>
                      </div>
                      <button 
                        className="px-3.5 py-1.5 bg-primary/15 hover:bg-primary/25 text-primary rounded-lg text-[10px] font-mono font-bold border border-primary/30 transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                        onClick={() => alert('AI Suggestion Applied! Database sync active.')}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex flex-col max-w-[85%] items-start self-start animate-fade-in">
            <div className="flex items-center gap-2 mb-1.5 px-1.5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-secondary/70">
                Assistant
              </span>
            </div>
            <div className="flex items-center gap-1.5 py-2 px-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls pane */}
      <div className="mt-auto pt-4 relative">
        <form onSubmit={handleSendMessage} className="relative max-w-2xl mx-auto z-10">
          
          {/* Input box */}
          <div className="glass-card rounded-2xl flex items-center p-2.5 border border-outline-variant focus-within:border-primary/50 transition-all shadow-xl shadow-black/30">
            <Sparkles className="w-5 h-5 text-primary ml-3 shrink-0 animate-pulse" />
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a command or ask Taskify AI..."
              className="bg-transparent border-none focus:ring-0 outline-none flex-1 text-on-surface placeholder-on-surface-variant/40 px-4 py-2.5 text-xs font-medium font-sans"
            />
            <button 
              type="submit"
              className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/95 text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer shadow-md shadow-primary/20"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex justify-center gap-6 mt-3 text-[9px] font-mono text-on-surface-variant/45 uppercase tracking-widest font-bold">
            <span>⌘K for Quick Actions</span>
            <span>/ for Templates</span>
          </div>

        </form>
      </div>

    </section>
  );
}

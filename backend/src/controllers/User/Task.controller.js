import task from "../../models/User/addTask.js";

export const addTask = async (req, res) => {
    try {
        const {  taskTitle, taskDescription, taskPriority, taskCategory, taskDueDate } = req.body;
        if ( !taskTitle || !taskDueDate || !taskPriority || !taskCategory || !taskDescription) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const Task = await task.create({
            userId: req.user.id,
            taskTitle,
            taskDescription,
            taskPriority,
            taskCategory,
            taskDueDate
        });
        return res.status(201).json({
            success: true,
            message: "Task added successfully",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const fetAllTasks = async (req , res)=>{
    try{
        const tasks = await task.find({userId:req.user.id})

        res.status(200).json({
            success:true,
            tasks
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
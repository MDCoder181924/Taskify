import task from "../../models/User/addTask.js";

export const addTask = async (req, res) => {
    try {
        const {  taskTitle, taskDescription, taskPriority, taskCategory, taskDueDate } = req.body;
        if ( !taskTitle || !taskDueDate || !taskPriority || !taskCategory || !taskDescription) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const Task = await task.create({
            userId: req.user.userId,
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
        const tasks = await task.find({userId:req.user.userId})

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

export const complitTask = async ( req , res) =>{
    try{
        const taskId = req.body.taskId;
        if(!taskId){
            return res.status(400).json({
                success:false,
                message:"Task Id is required"
            })
        }
        const Task = await task.findOne({_id:taskId , userId:req.user.userId});
        if(!Task){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }
        Task.taskStatus = "completed";
        await Task.save();
        return res.status(200).json({
            success:true,
            message:"Task marked as complete"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message : error.message
        })
    }
}

export const TaskEdite = async ( req  , res) =>{
    try{
        const { taskId , taskTitle , taskDescription , taskPriority , taskCategory , taskDueDate } = req.body;
        if(!taskId || !taskTitle || !taskDescription || !taskPriority || !taskCategory || !taskDueDate){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const Task = await task.findOne({_id:taskId , userId:req.user.userId});

        if(!Task){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }

        Task.taskTitle = taskTitle;
        Task.taskDescription = taskDescription;
        Task.taskPriority = taskPriority;
        Task.taskCategory = taskCategory;   
        Task.taskDueDate = taskDueDate;

        await Task.save();

        return res.status(200).json({
            success:true,
            message:"Task updated successfully"
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
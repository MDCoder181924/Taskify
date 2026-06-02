import mongoose from 'mongoose';

const addTask = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user" ,
        required : true
    },
    taskTitle : {
        type : String ,
        required : true,
        trim: true,
    },
    taskDescription : {
        type : String ,
        default : "" ,
        trim: true,
    },
    taskPriority : {
        type : String ,
        enum : ['Low' , 'Medium' , 'High'] ,
        default : 'Medium'
    },
    taskStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    taskCategory : {
        type : String ,
    },
    taskDueDate : {
        type : Date ,
    },
},{timestamps:true});

const task = mongoose.model("task" , addTask);
export default task;
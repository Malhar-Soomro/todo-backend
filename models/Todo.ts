import mongoose from "mongoose";

interface ITodo {
    _id:mongoose.Types.ObjectId,
    userId:string,
    title:string,
    description:string,
    completed: boolean;
}

const todoSchema = new mongoose.Schema<ITodo>({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false,
    }
});

export default mongoose.model<ITodo>("todos", todoSchema);

import mongoose from "mongoose";

interface ITodo {
    _id:mongoose.Types.ObjectId,
    userId:string,
    title:string,
    description:string,
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
});

export default mongoose.model<ITodo>("todos", todoSchema);

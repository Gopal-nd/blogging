import mongoose, { Schema } from 'mongoose'

const commentSchema = new mongoose.Schema({
 content:{
type:String,
required:true
 },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog" 
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user" 
    }
},
{timestamps:true})

export const commentModel = mongoose.model('comment',commentSchema);
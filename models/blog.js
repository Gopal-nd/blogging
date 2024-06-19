import mongoose, { Schema } from 'mongoose'

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImage:{
 
          type:String,
        default:'../public/images/test.png'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user" 
    }
},
{timestamps:true})

export const BlogModel = mongoose.model('blog',blogSchema);
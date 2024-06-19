import express from 'express';
import path from 'path';

import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import { CheckforCookies } from './middleware/authentication.js';
import { blogRouter } from './routes/blog.js';
import { BlogModel } from './models/blog.js';

mongoose.connect('mongodb+srv://docode999:docode999@cluster0.9zimmkn.mongodb.net/blogging')
.then(()=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log('mongodb error :',err)
})


const app = express();
const PORT = 3000




app.use(cookieParser());
app.use(CheckforCookies("token"))
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.static(path.resolve('./public')))
app.get('/',async(req,res)=>{
    const allBlogs = await BlogModel.find({})
    res.render('home',{
        user:req.user,
        blogs:allBlogs,
    })
})

app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(PORT,()=>{
    console.log('running in port:',PORT)
})
import express from 'express'
import path from 'path'
import multer from 'multer'
import { BlogModel } from '../models/blog.js'
export const blogRouter = express.Router()

let imageis = 'uploads/1718802250449-VNGJOAVBLJ-preview.png'
blogRouter.get('/add-new',async(req,res)=>{
const {title,body,coverImage} = req.body
    return res.render('addblog',{
        user:req.user,
    })
})

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(`./public/uploads/`))
    },
    filename:function(req,file,cb){
        const filename = `${Date.now()}-${file.originalname}`
        cb(null,filename)
    },
})
const upload = multer({storage:storage})

blogRouter.post('/',upload.single('coverImage'),async(req,res)=>{
const {title,body} = req.body
console.log(req.body)
console.log(req.file)
if(!req.file) {
    imageis
}

   let  imageis =  `uploads/${req.file.filename}`
const blog = new BlogModel({
    title:title,
    body,
    createdBy:req.user._id,
    coverImage:`uploads/${req.file.filename ?req.file.filename:'1718800422155-download.png'}`

})
await blog.save()

    return res.redirect(`/blog/${blog._id}`)
})


blogRouter.get('/:id',async(req,res)=>{
const blog = await BlogModel.findById(req.params.id)

return res.render('blog',{user:req.user,
    blogs:blog})
})
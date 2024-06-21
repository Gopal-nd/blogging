import { randomBytes, createHmac } from 'crypto';
import mongoose from 'mongoose';
import { createTokenForUser } from '../services/authentication.js';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        required:true,
        type:String,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        required:true,
        type:String,
    },
    profileImage:{
        type:String,
        default:'/images/download.png'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified("password")) return

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();
})

userSchema.static('matchPasswordAndGenrateToken',async function(email,password){
    const user =await this.findOne({email});
    if(!user) return 

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256",salt).update(password).digest("hex");

    if(hashedPassword  !== userProvidedHash)  return 
   
   const token = await createTokenForUser(user)
        return  token
 })



export const UserModel = mongoose.model("user",userSchema)

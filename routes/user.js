import express from "express";
import { UserModel } from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/signin", async (req, res) => {
  return res.render("signin");
});

userRouter.get("/signup", async (req, res) => {
  return res.render("signup");
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);
  try {
    const { fullName, email, password } = req.body;

    // Create a new user instance
    const user = new UserModel({
      fullName,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    return res.redirect("/");
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating user", error });
  }
});




userRouter.get("/logout", async (req, res) => {
res.clearCookie('token').redirect('/')
});

userRouter.post("/signin", async (req, res) => {

  try {
    const { email, password } = req.body;

    // Create a new user instance
    const token = await UserModel.matchPasswordAndGenrateToken(email, password);
console.log(token)
if(!token){
  return res.render('signin',{
    error:"invalid creadentials"
  })
}
 
    // console.log("user token is ",token)

    return res.cookie('token',token).redirect("/");
  } catch (error) {
    console.log( "error is ",error);
    res.render('signin',{
      error:"invalid creadentials"
    })
  }
});



export default userRouter;

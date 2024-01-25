const {Router}= require("express")
const express = require ("express")
const {z} =require("zod")
const jwt=require("jsonwebtoken")
const  UserAuthorization = require("../middleware02/user.js/user") // Assuming middleware is at the root level
const db=require("../db/db.js")
const JWT_SECRET="1234"
const app=express()
app.use(express.json());
const signUpSchema=z.object(
    {
        username:z.string().email(),
        password:z.string().min(6)
    }
)

app.post("/user/signup",async (req,res)=>{
const {username,password}=req.body
try{
signUpSchema.parse({username,password})
await db.user.create({
    username:username,
    password:password
})
res.send("User Created Successfully")
}
catch(err){
    console.log(err)
    res.status(403).send("Enter valid input")
}

})
app.post("/user/signin",async (req,res)=>{
    try{
    const {username,password}=req.body
   let validUser= await db.user.findOne({
        username:username,
        password:password
    })
    if(validUser){
    const token=jwt.sign(username,JWT_SECRET)
    res.send({token})
    console.log(validUser)
    }
    else{
        console.log("hi")
        res.send("Sign up first or enter valid details")
    }
}
catch(err){
    console.log(err)
}

})
app.post("/user/course",UserAuthorization ,async (req,res)=>
{
    let course_id=req.query.course_id
    const token=req.headers.authorization
    const decodedValue= jwt.verify(token,JWT_SECRET)
    try{
        console.log(token)
       console.log(decodedValue )
       const existingUser = await db.user.findOne({ username: decodedValue });
      if (!existingUser) { 
 
    return res.status(404).json({ error: "Usi not found" });
      }
 
        console.log(course_id)
       const result =await db.user.updateOne({username:decodedValue},{$push:
    {
         
        purchasedCourses:course_id
    }
  })
  if (result.modifiedCount === 1) {
    return res.json({ message: "Course purchased successfully" });
 } else {
    return res.status(404).json({ error: "User not found" });
 }
      // res.send("Course purchased successfully")
        
    }catch(err){
       console.log(err)
    }
    /*const validCourse=db.course.findOne({
        _id:course_id
    })
    if(validCourse){
        user
    }*/
})

app.get("/user/courses",UserAuthorization,async(req,res)=>{
    const courses=await db.course.find()
    res.json({
        courses:courses
    })
})
app.get("/user/purchasedCourses",UserAuthorization,async (req,res)=>{
    const token=req.headers.authorization
    const decodedValue= jwt.verify(token,JWT_SECRET)
    const user= await db.user.findOne({username:decodedValue})
    const usersCourses= await db.course.find({
        _id:{ $in:user.purchasedCourses}
    })
    res.json({
        courses:usersCourses
    })
})
app.listen("3000",()=>{
console.log("server running on port 3000")
})
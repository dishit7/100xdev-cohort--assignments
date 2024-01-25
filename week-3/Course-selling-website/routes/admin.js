const {Router}= require("express")
const express = require ("express")
const {z} =require("zod")
const jwt=require("jsonwebtoken")
const  adminAuthorization = require("../middleware02/admin.js") // Assuming middleware is at the root level
const db=require("../db/db.js")
const JWT_SECRET="1234"

const router=Router()
const app=express()
app.use(express.json());
const signupSchema=z.object({
  username:z.string().email(),
  password:z.string().min(6)

});
const courseSchema=z.object({
    title:z.string(),
    description:z.string().max(50),
    imageLink:z.string(),
    price:z.number()


})

router.post("/admin/signup",async(req,res)=>{
    const {username,password}=req.body
    try{
     signupSchema.parse({username,password})
    await db.Admin.create(
        {
         username: username,
         password:password
        })
        res.send("Admin Created Successfully")
    }
    catch(err){
        console.log(err)
       res.status(400).json({msg:"Invalid input"})
    }
})

router.post("/admin/signin",async(req,res)=>{
    const username=req.body.username
    const password=req.body.username
    const user=await db.Admin.find({
    username,
    password
   })

   if(user){
    const token=jwt.sign({
    username
    },JWT_SECRET)
    res.send({ 
        token
    })
   }
    else{
        res.status(411).send({
         msg: " enter valid email address or password"
        })
    }
})

app.post("/admin/courses", adminAuthorization,async(req,res)=>{
    /*const title=req.body.token
    const description=req.body.description
    const imageLink=rew.body.imageLink
    const price=req.body.price
    */
   const {title,description,imageLink,price}=req.body
   try{
    courseSchema.parse({title,description,imageLink,price})
    const newCourse=await db.course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price

    })
    res.json({
        msg:"Course created successfully  ",
        course_id: newCourse._id 
    })
   }
   catch(err){
    console.log(err)
    res.send("Enter valid input")
   }

})

app.get("/admin/courses",adminAuthorization,async (req,res)=>{
   const response = await db.course.find({})
res.json({
    courses:response
})
})
app.use(router)
app.listen(3000,()=>{
    console.log("server running on port 3000")
})
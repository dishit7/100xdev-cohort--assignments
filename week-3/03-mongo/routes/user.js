const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username= req.body.username
    const password=req.body.password
    User.create({
        username,
        password
    })
    res.send({
        msg:"User signed up successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response  = await course.find({})
    res.json({
       courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const course_ToBuy= req.params.courseId
    const username=req.headers.username
    user.updateOne(
{
    username:username
}
,{
    "$push":{
    purchasedCourses:courseId
    }
})
res.json({
   msg: "purchase completed"
})

    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username=req.headers.username
    const course=await course.find({
        id_:{
           " $in":user.purchasedCourses
        }
    })
    res.json({
        courses: course
    })
});

module.exports = router
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.headers.username
    const password=req.headers.username
    admin.create({
        username,
        password
    })
    res.json({
        msg:"signed up successfully"
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title= req.body.title
    const description=req.body.description
    const imageLink=req.body.imageLink
    const price=req.body.price
    const newcourse=await course.create(
        title,
        description,
        imageLink,
        price
    )
    res.json({
        msg:"course created successfully",
        courseId:newcourse._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response= await   course.find({})
    res.json({
        courses:response
    })
});

module.exports = router;
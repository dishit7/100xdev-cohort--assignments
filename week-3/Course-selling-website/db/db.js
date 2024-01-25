const mongoose= require ("mongoose")
mongoose.connect("mongodb+srv://dishit7:Bulbasaur_47@cluster0.9xcq530.mongodb.net/user_app",);
const AdminSchema= new mongoose.Schema({
    username:{type:String,unique:true},
    password:String
}
)
const Admin=mongoose.model("Admin",AdminSchema)
const CourseSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    adminID:{type:mongoose.Schema.Types.ObjectId,ref:Admin}
    
})
const course=mongoose.model("Course",CourseSchema)
const UserSchema= new mongoose.Schema({
    username:{type:String,unique:true},
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,ref:course
    }]
})



const user=mongoose.model("User",UserSchema)
module.exports = { Admin,course,user };
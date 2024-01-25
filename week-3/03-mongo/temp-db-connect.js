const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://dishit7:Bulbasaur_47@cluster0.9xcq530.mongodb.net/user_app",
);
 

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: { type: String, unique: true },
  password: String,
});
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  admin_ID: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
});
const   UserSchema= new mongoose.Schema({
  username:String,
  passsword:String,
  purchasedCourses:[{
    type:mongoose.Schema.Types.ObjectId,ref :"course"
  }]
})
const admin = mongoose.model("admin", AdminSchema);
const course = mongoose.model("course", CourseSchema);

const newAdmin = new admin({ username: 'admin2', password: 'password123' });
newAdmin.save();

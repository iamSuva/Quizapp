const express=require("express");
const router=express.Router();
const userModerl=require("../models/userModel");
const questionModel = require("../models/questionModel");

const userauth=require("../auth/userAuth");
 
 router.post("/signup",async(req,res)=>{
    try {
        const {name,rollno,age,gender,password}=req.body;
        if(!name || !rollno || !age || !gender || !password)
        {
            res.status(201).json("some fields are empty");
        }else{
            const user=await userModerl.create({
                name,
                rollno,
                age,
                gender,
                password
            })
            res.status(201).json({msg:"user registerd ",user})
        }
    } catch (error) {
        console.log(error);
    }

 })
 router.post("/",async(req,res)=>{
    try {
        const {rollno,password}=req.body;
        if(!rollno || !password)
        {
            res.status(201).json("some fields are empty");
        }else{
           
           const user=await userModerl.findOne({rollno:rollno});
           if(user.password==password && user.rollno==rollno)
           console.log(user);
           req.session.user=user;
            res.status(201).json({msg:"user login successfull ",user})
        }
    } catch (error) {
        console.log(error);
    }

 })

 router.get("/",(req,res)=>{
    res.render("login");
 })

 router.get("/signup",(req,res)=>{
   res.render("signup");
 })

 router.get("/home",userauth,async(req,res)=>{
    const user=req.session.user;
try {
    const data=await questionModel.find({});
    console.log(data);
} catch (error) {
    
}

    res.render("home",{user});
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})
router.get("/allquestion",async(req,res)=>{
    try {
        // Get all questions
        const questions = await questionModel.find().limit(5);
        console.log('All Questions:', questions.length);
        
        if (questions.length > 0) {
            res.status(200).json({ msg: "All questions", questions });
        } else {
            res.status(404).json({ msg: "No questions found" });
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})
 module.exports=router;
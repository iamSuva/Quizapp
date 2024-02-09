const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: "er38n3iuinv39j",
    cookie: { maxAge: 60 * 60 * 1000 } //10min in miliseconds
}))
app.set("view engine","ejs");

const userRoutes=require("./routes/userRoutes");

//connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/quizapp").then(()=>{
    console.log("connected to db");
    app.listen(3000,(err)=>{
        console.log("listening on port 3000");
    })
}).catch((err)=>{
    console.log(err);
});


app.use("/",userRoutes);
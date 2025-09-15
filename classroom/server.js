const express = require('express');
const app = express();
const users=require("./routs/user.js");
const posts=require("./routs/post.js");

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello");
    res.cookie("Madein","India");
    res.send("sent you some cookies!");
})

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("hi i am root!");
});


app.use("/user",users);
app.use("/post",posts);

app.listen(3000,()=>{
    console.log("server is listing to 3000");
})
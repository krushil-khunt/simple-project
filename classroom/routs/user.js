const express = require('express');
const router=express.Router();

//indec-user
router.get("/",(req,res)=>{
    res.send("get for user");
});

//show-user
router.get("/:id",(req,res)=>{
    res.send("get for  shoe user");
});
//post-user
router.post("/",(req,res)=>{
    res.send("post for user");
});

//delet-user
router.delete("/:id",(req,res)=>{
    res.send("delete for user id");
});

module.exports=router;
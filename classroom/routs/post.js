const express = require('express');
const router=express.Router();

//indec
router.get("/",(req,res)=>{
    res.send("get for post");
});

//show
router.get("/:id",(req,res)=>{
    res.send("get for  shoe post");
});
//post
router.post("/post",(req,res)=>{
    res.send("post for post");
});

//delet
router.delete("/:id",(req,res)=>{
    res.send("delete for post id");
});

module.exports=router;
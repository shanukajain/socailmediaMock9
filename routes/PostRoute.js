const express=require("express");
const { PostModel } = require("../model/PostModel");
const { UserModel } = require("../model/UserModel");
const PostRoute=express.Router();
PostRoute.get("/",async(req,res)=>{
    let posts=await PostModel.find();
    res.status(200).send(posts)
})
PostRoute.post("/",async(req,res)=>{
 let payload=req.body;
 let post=new PostModel(payload);
 await post.save();
 let postid= await PostModel.findOne(payload);
 await UserModel.updateOne({"_id":payload.user},{$push:{posts:postid}});
 res.status(201).send("done")
})
PostRoute.patch("/:id",async(req,res)=>{
    let payload=req.body;
    let id=req.params.id
    await PostModel.findByIdAndUpdate({"_id":id},payload);
    res.status(204).send("done");
})

PostRoute.delete("/:id",async(req,res)=>{
    let id=req.params.id
    await PostModel.findByIdAndDelete({"_id":id});
    res.status(202).send("done");
})
PostRoute.get("/:id",async(req,res)=>{
    let id=req.params.id
 let post=await PostModel.findOne({"_id":id});
    res.status(200).send(post);
})
PostRoute.post("/:id/like",async(req,res)=>{
    let id=req.params.id;
    let userid=req.body.user;
await PostModel.updateOne({"_id":id},{$push:{likes:userid}});
    res.status(201).send("done");
})
PostRoute.post("/:id/comment",async(req,res)=>{
    let id=req.params.id;
    let payload=req.body;
await PostModel.updateOne({"_id":id},{$push:{comments:payload}});
    res.status(201).send("done");
})

module.exports={
    PostRoute
}
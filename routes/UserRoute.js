const express=require("express");
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/UserModel");
const UserRoute=express.Router();
UserRoute.get("/",(req,res)=>{
    res.send("User Page")
})
UserRoute.post("/register",async(req,res)=>{
   let payload=req.body
        bcrypt.hash(payload.password, 5,async function(err, hash) {
            payload.password=hash;
            let user=new UserModel(payload);
            await user.save();
            res.status(201).send("done");
        });
})

UserRoute.get("/users",async(req,res)=>{
    let users=await UserModel.find();
    res.status(200).send(users);
})
UserRoute.get("/users/:id/friends",async(req,res)=>{
let id=req.params.id;
let user=await UserModel.findOne({"_id":id});
let users=await UserModel.find();
let friends=[];
for(i=0;i<user.friends.length;i++){
    for(j=0;j<users.length;j++){
        if(String(users[j]._id)==String(user.friends[i])){
            friends.push(users[j]);
        }
    }
}
res.status(200).send(friends);
})
UserRoute.post("/users/:id/friends",async(req,res)=>{
    let id=req.params.id;
    let userid=req.body.userid;
    await UserModel.updateOne({"_id":userid},{$push:{friendRequests:id}});
    res.status(201).send("done");
    })
UserRoute.patch("/users/:id/friends/:friendId",async(req,res)=>{
    let userid=req.params.id;
    let id=req.params.friendId;
    await UserModel.updateOne({"_id":id},{$push:{friends:userid}});
    await UserModel.updateOne({"_id":userid},{$push:{friends:id}});
    await UserModel.updateOne({"_id":id},{$pull:{friendRequests:userid}});
    res.status(204).send("done");
})
module.exports={
    UserRoute
}
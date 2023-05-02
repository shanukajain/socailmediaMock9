const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
})
const UserModel=mongoose.model("user",UserSchema);

module.exports={
    UserModel
}
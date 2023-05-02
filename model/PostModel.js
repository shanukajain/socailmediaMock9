const mongoose=require("mongoose");
const PostSchema=mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      text: String,
      createdAt: Date
    }]
})
const PostModel=mongoose.model("Post",PostSchema);

module.exports={
    PostModel
}
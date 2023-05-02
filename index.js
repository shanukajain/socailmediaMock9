const express=require("express");
const { UserRoute } = require("./routes/UserRoute");
const { PostRoute } = require("./routes/PostRoute");
const { connection } = require("./config/db");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("home page");
})
app.use("/api",UserRoute);
app.use("/api/posts",PostRoute);


app.listen(3000,async()=>{
    try {
        await connection;
        console.log("DB connected")
    } catch (error) {
        console.log("error");
    }
    console.log("port 3000");
})
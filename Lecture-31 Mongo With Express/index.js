const express = require("express")
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');
// const ExpressError = require("./ExpressError.js");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().then(() =>{
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}
 

// <--let chat1= new Chat({
//     from: "apnaclg",
//     to:"students",
//     msg:"Till theb keep coding keep exploring!",
//     created_at:new Date()
// });-->

// chat1.save();

app.listen(8080, ()=>{
    console.log("Server Listening to port 8080 ")
});

// Index Route
app.get("/chats",async(req,res) =>{
    let chats = await Chat.find()
    // console.log(chats);
    res.render("index.ejs",{chats});
});
//New - Show Route
app.get("/chats/:id",async(req,res,next)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//NewChat Form Route
app.get("/chats/new",(req,res) => {
    // throw new ExpressError(404,"Page not Found");
    res.render("new.ejs");
});
//NEW CHAT EDIT ROUTE
app.post("/chats",(req,res)=>{
    let{from,to,msg} = req.body;
    let newChat = new Chat({
            from: from,
            to:to,
            msg:msg,
            created_at:new Date()
        });
        newChat.save()
        .then(res => 
            {console.log("chat was saved!")})
        .catch(err =>{
            console.log(err);
        });

    res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
    let {id} =req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
//Update Route
app.put("/chats/:id",async(req,res) => {
    let {id} =req.params;
    let { msg: newMsg}= req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats"); 
});
//Destroy Route
app.delete("/chats/:id", async(req,res)=>{
    let {id} =req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});
app.get("/",(req,res) =>{
    res.send("Root is Working");
});

//ERROR HANLING MIDDLEWARE
// app.use((err,res,req,next)=>{
//     let {status=500,message="Some Error Occurs"}= err;
//     res.status(status).message(message);

// })
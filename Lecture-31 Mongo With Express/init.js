const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main().then(() =>{
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats = [
    {
        from:"Random Sena",
        to:"Elvish Yadav",
        msg:"Your System is on Rent 😂😂😂",
        created_at:new Date(),
    },
    {
        from:"Apna College",
        to:"Delta_Students",
        msg:"We have two days holidays complete ur backlog!",
        created_at:new Date()
    },
    {
        from:"Apna College",
        to:"Delta_Students",
        msg:"New Chapter of MongoDB Has uploaded",
        created_at:new Date(),
    },
    {
        from:"Apna College",
        to:"Delta_Students",
        msg:"Till then keep coding Keep Learning!!",
        created_at:new Date(),
    },
    {
        from:"Bhavik",
        to:"Shardha Khapara",
        msg:"Best Coding Teacher!!",
        created_at:new Date(),
    },  
];
Chat.insertMany(allChats);
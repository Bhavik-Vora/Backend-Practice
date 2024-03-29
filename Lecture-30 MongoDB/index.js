const mongoose = require("mongoose");
main().then(()=>{
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
}); 

const User = mongoose.model("User",userSchema);

// User.deleteOne({name:"Apna College"}).then((res) => {    
//         console.log("Deleted Succesfully");
//     })
//     .catch((err) =>{
//         console.log(err);
//     });

User.findByIdAndUpdate("6604d035569f7852a8bde38d",{age:26}).then(res=>{
    console.log("Update Done!");
});

// User.findOne({age:{$gt:20}})
// .then((res) => {    
//     console.log(res);
// })
// .catch((err) =>{
//     console.log(err);
// });

// User.findById("6604d035569f7852a8bde38f");


// const user1 = new User({
//     name:"Apna College",
//     email:"apnaclg@gmail.com",
//     age:24,
// });

// user1.save();   

// User.insertMany(
//     [
//         {name:"Bhavik",email:"apnaclgdelta@gmail.com",age:21},
//         {name:"Shardha Khapra",email:"apnaclgdelta2@gmail.com",age:24},
//         {name:"Aman Dhatarwal",email:"apnaclgdelta3@gmail.com",age:25},
//     ]).then(res =>{
//         console.log(res);
//     });

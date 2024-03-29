const express = require("express");
let app = express();
let port = 8080;
const path = require("path");

const methodoverride =require("method-override"); 
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended : true})); 
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(methodoverride('_method'));
 
let posts= [
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"i Love Coding !"
    },

    {
        id:uuidv4(),
        username:"BhavikVora",
        content:"Creating First REST Api 😁"
    }
,
    {
        id:uuidv4(),
        username:"Shardhakhapra",
        content:"Teaching How to Create  First REST Api 😊"
    }
]


app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Listening to port : ${port}` );
});

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{ posts });
});



app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});



app.get("/posts/:id",(req,res) =>{
    let { id }= req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{ post });
});


app.get("/posts/:id/edit",(req,res)=>{
    let { id }= req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
   
});


app.patch("/posts/:id",(req,res)=>{
    let { id }= req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
  
    post.content = newContent;
    console.log(post);
    res.redirect('/posts');

});

app.delete("/posts/:id",(req,res)=>{
    let { id }= req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.post("/posts",(req,res) =>{
    // 

    let id = uuidv4();
    let {username,content} = req.body;

    posts.push({id,username,content});
    
    res.redirect("/posts");
});
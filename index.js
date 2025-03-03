//cd D:/Users/UI_1/Documents/Delta/Backend/REST_CLASS
const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");

//api can understand request
app.use(express.urlencoded({extended:true}));
//use post req
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[{
       id:uuidv4(),
       username:"rushit",
       content:"i love coding"
    },
    {
        id:uuidv4(),
        username:"harsh",
        content:"jay swaminarayan"
    },
    {
        id:uuidv4(),
        username:"jay",
        content:"hack the spring!"
    }];
//all past
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
//on form
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});
//on submit
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    //for add new post on posts array
    posts.push({id,username,content});
    //coonect to all post get
    res.redirect("/posts");
});
//view id route
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    //return post if id ==p.id
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});
//edit content
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    //update content
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});
//on edit form
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
//delete post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    //only post id id is not same they can stand
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listing on port:8080");
});
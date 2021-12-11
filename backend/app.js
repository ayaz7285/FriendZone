const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(express.static('public'))
app.use(fileUpload());

//connecting to DB
mongoose.connect("mongodb://127.0.0.1:27017/friendzone",{
    useNewURLParser:true,
    useUnifiedTopology:true
},()=>{console.log("connected to db")});

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact:String,
    DOB:String,
    bio:String,
    image:String,
    friends:[
        {
            name:String
        }
    ]
})

const User = mongoose.model("User",userSchema);


//Uploading Profile Pic
app.post("/upload",(req,res)=>{
    const image = req.files.pp
    console.log("user",req.body.name)
    const name = req.body.name;
    image.mv('public/'+image.name, function(err) {
    if (err)
      return res.status(500).send(err);

    // res.send('File uploaded!');

    console.log("image successfully uploaded",image)

    User.findOne({name:name},(err,user)=>{
        if(user){
            user.image = "http://localhost:8080/" + image.name
            user.save(err=>{
                    res.send({message:"profile pic updated",user:user})
            })
        }else{
            res.send("user not found, unable to upload profile pic")
        }
        })

    });


})


//add friend to friend list
app.post("/addfriend",(req,res)=>{
    const {name,friendName} = req.body
    const friend = {
        name:friendName
    }
    console.log("add to friendList",req.body)
    User.findOne({name:name},(err,user)=>{
        if(user){
            user.friends.push(friend)
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:`${friendName} added to your friendList`,user:user})
                }
            })
        }else{
            res.send("user not found, unable to add friend")
        }
    })
})



const postSchema = new mongoose.Schema({
    name:String,
    likes:Number,
    dislikes:Number,
    info:String,
    comments:[
        {
            name:String,
            comment:String
        }
    ]
})

const Post = mongoose.model("Post",postSchema);

//add post
app.post("/addpost",(req,res)=>{
    const {name,info} = req.body;
    console.log("add post",req.body)
    let likes=0
    let dislikes=0
    let comments=[]
    const newPost = new Post({name,likes,dislikes,info,comments})
    newPost.save(err=>{
        if(err){
            res.send(err)
        }else{
            res.send({message:"post added",post:newPost})
        }
    })
})

//add comment to a certain post
app.post("/addcomment",(req,res)=>{
    const {id,name,info} = req.body;
    console.log("add comment",req.body)
    const comment = {
        name:name,
        comment:info
    }
    Post.findOne({_id:id},(err,post)=>{
        if(post){
            post.comments.push(comment)
            post.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:`comment added`,post:post})
                }
            })
        }else{
            res.send("post not found, unable to add post")
        }
    })
})

//update like dislike
app.post("/like_dislike",(req,res)=>{
    const {id,likes,dislikes} = req.body
    console.log("likes/dislikes",req.body)
    Post.findOne({_id:id},(err,post)=>{
        if(post){
            post.likes+=Number(likes)
            post.dislikes+=Number(dislikes)
            post.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:`likes dislikes added`,post:post})
                }
            })
        }else{
            res.send("post not found, unable to update likes/dislikes")
        }
    })
})

//get all posts present in DB
app.get("/posts",(req,res)=>{
    Post.find({},(err,post)=>{
        if(post)
        {
            res.send(post)
        }else{
            res.send(err)
        }
    })
})

//get all posts of a particular user
app.get("/posts/:name",(req,res)=>{
    const name = req.params.name
    Post.find({name:name},(err,post)=>{
        if(post)
        {
            res.send(post)
        }else{
            res.send(err)
        }
    })
})

//get user profile info
app.get("/profile/:name",(req,res)=>{
    const name = req.params.name
    User.findOne({name:name},(err,profile)=>{
        if(profile){
            res.send(profile)
        }else{
            res.send(err)
        }
    })
})

//deleting post
app.post("/delete",(req,res)=>{
    const {id} = req.body
    console.log(req.body)
    Post.findOne({_id:id},(err,post)=>{
        if(post)
        {
            post.delete()
            res.send("Post deleted")
        }else{
            res.send("Post not found")
        }
    })
})


app.post("/login",(req,res)=>{
    const {email,password} = req.body
    console.log("data entered",req.body)
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password==user.password){
                res.send({message:"login sucees",user:user})
            }else{
                res.send({message:"Wrong credentials"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    })
})

app.post("/register",(req,res)=>{
    const {name,email,password,contact,DOB,bio} = req.body
    const image = "http://localhost:8080/user.png";
    console.log("data entered",req.body)
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exists"})
        }else{
            let friends=[]
            const user = new User({name,email,password,contact,DOB,bio,image,friends})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"register success",user:user})
                }
            })
        }
    })
})


app.listen(8080);
console.log('server running on port 8080');






// const express=require('express');
// const app=express();
// const mongoose=require("mongoose");
// const User = require('./models/users');
// var crypto =require('crypto');
// var key = "password";
// var algo='aes256';

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// mongoose.connect('mongodb+srv://Rekor:HAdQrzUpPSLXqPDx@cluster0.5rjxq.mongodb.net/Login?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//    console.log("connected")
// })
// //Password:HAdQrzUpPSLXqPDx
// //User:Rekor

// app.post('/login',function(req,res){
//     var cipher= crypto.createcrypto.createDecipheriv(algo.key);
//     var encrypted =cipher.update(req.body.password,'utf8','hex');
//     console.warn(req.body.encrypted);
//     +cipher.final('hex');
//     res.end('Hello');
// })

// app.get("/",function(req,res){
//     res.end("Hello")
// }) 
// app.listen(4500);



const express=require('express');
const app=express();

app.listen(3000,()=>console.log('Server Up and running'));
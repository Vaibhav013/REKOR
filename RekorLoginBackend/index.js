const express=require('express');
const app=express();
const mongoose= require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
//config
dotenv.config();

//Connect To DB
// mongoose.connect('mongodb+srv://vaibhav:rhino11@cluster0.5rjxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
// { useUnifiedTopology: true , 
//   useNewUrlParser: true },
// ()=>console.log('connected to db'))

mongoose.connect(
    process.env.DB_CONNECT,
{ useUnifiedTopology: true , useNewUrlParser: true },
()=>console.log('connected to db'))

//Middleware
app.use(express.json());
// app.use(express.urlencoded({extended: true}))



//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);



app.listen(3000,()=>console.log('Server Up and running'));
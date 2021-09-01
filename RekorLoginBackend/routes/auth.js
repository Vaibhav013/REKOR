// const router = require('express').Router();
// const User = require('../model/User');


// //VALIDATION
// const Joi = require('@hapi/joi');

// const schema = Joi.object({
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// });



// router.post('/register',  (req, res) => {

//     console.log("hello")
//     res.send("Hello")
//     //VALIDATING DATA BEFORE SAVING USER
//     // const validation =schema.validate(req.body,schema);
//     // res.send(validation)

//     // const user = new User({
//     //     name: req.body.name,
//     //     email: req.body.email,
//     //     password: req.body.password
//     // });
//     // try {
//     //     const savedUser = await user.save();
//     //     res.send(savedUser);
//     // } catch (err) {
//     //     res.status(400).send(err);
//     // }
// })

// // router.post('/login',(req,res)=>{
// //     res.send('Register');
// // })

// module.exports = router;






const express = require("express");
const router = express.Router();
const User = require("../model/User");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { registerValidation, loginValidation } = require("../validation");

//REGISTERATION
router.post("/register", async (req, res) => {
  // Validate data before creation:
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist= await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send("Email already exists");

  //Hash passwords
  const salt =await bcrypt.genSalt(10);
  const hashedPassword =await bcrypt.hash(req.body.password,salt);

  //Create new User
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send({user: user._id});
  } catch (error) {
    res.status(400).send(error);
  } 
});

//LOGIN
router.post("/login", async (req, res) => {

    //Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


        //Checking if the email exist
        const user= await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send("Email is not found");

        //Password is correct 
        const validPass =await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');

        //Create and assign a token
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token',token).send(token);

        // res.send('Logged in!');
});



module.exports = router;

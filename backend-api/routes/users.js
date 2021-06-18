var express = require('express');
var router = express.Router();
var User = require('../models/user')

var tokenService = require('../services/auth');
var passwordService = require('../services/password');

// route for user registration (Add User) -> /register
router.post('/register', async (req, res, next) => { 
  try{
    // console.log(req.body);
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: passwordService.hashPassword(req.body.password),
      phoneNumber: req.body.phoneNumber,
      address: req.body.address
    });
    console.log(newUser)
    let result = await newUser.save();
    // console.log(result);
    res.json({
      status: 200,
      massage: "user created",
      newUser: result 
    });
  }
  catch(err){
    console.log(err);
    res.send("error");

  }

})
// route for login  -> /login
router.post('/login', async (req, res, next)=>{
  // console.log(req.body);
  let foundUser = User.findOne({username: req.body.username});
  console.log(foundUser);
  
  
})

// route to get the user  profile information -> /profile
router.get('/profile', async (req, res, next)=>{
  
})

module.exports = router;

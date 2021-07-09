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
      massage: "user created with Success",
      status: 200, 
    });
  }
  catch(err){
    console.log(err);
    res.send("error");
    console.log("Wrong Password!")
    res.json({
        message: "Wrong Password!",
        status: 403,
      })

  }

})
// route for login  -> /login
router.post('/login', async (req, res, next)=>{
  // console.log(req.body);
  User.findOne({username: req.body.username}, function(err, user){
    if(err){
      console.log(err)
      res.json({
        message: "Error Accessing Database",
        status: 500,
    })
  }
    console.log(user);
    if(user){
      let passwordMatch = passwordService.comparePasswords(req.body.password, user.password);
      if(passwordMatch){
        let token = tokenService.assignToken(user);
        res.json({
          message: "Login was a Success",
          status: 200,
          token
        })
      }
      else{
        console.log("Wrong Password!")
        res.json({
          message: "Wrong Password!",
          status: 403,
        })
      }
    }
    else{
      res.json({
        message: "Wrong username",
        status: 403,
    }) 
  }
})
})

// route to get the user  profile information -> /profile
router.get('/profile', async (req, res, next)=>{
  let myToken = req.header.authorization;
  console.log(myToken);

  if(myToken){
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);
  
  if(currentUser){
    let responseUser = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      username: currentUser.username,
      deleted: currentUser.deleted,
      admin: currentUser.admin,
      phoneNumber: currentUser.phoneNumber,
      address: currentUser.address
    }

    res.json({
      message: "User Profile information loaded successfully",
      status: 200,
      user: responseUser
    })
  }
  else{
    res.json({
      message: "Token was invalid or expired",
      status: 403,
  })
}
    
  }
  else{
    res.json({
      message: "No Token Received",
      status: 403,
  })
}
})

module.exports = router;

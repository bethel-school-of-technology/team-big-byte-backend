// route to get the user  profile information -> /profile
router.get('/profile', async (req, res, next)=>{
    let myToken = req.header.authorization;
    console.log(myToken);
  
    if(myToken){
      let currentUser = await tokenService.verifyToken(myToken);
      console.log(currentUser);
    
    if(currentUser){
    
        // ROUTE LOGIC GOES HERE
        
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
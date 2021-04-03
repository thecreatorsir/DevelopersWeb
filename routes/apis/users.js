const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');
//   @route api/users/test
//   @desc test route for users
//   @access public      
router.get('/test',(req,res)  => res.json({
  msg : "users route",
}));

//   @route api/users/register
//   @desc  route for users to register themselves
//   @access public  

router.post('/register', (req, res) => {
  User.findOne({ email:req.body.email }).then(user => {
    if(user){
      return res.status(400).json({email:'Email already exists'});
    }else{
      const avatar = gravatar.url(req.body.email,{
        s:'200', //size
        r:'pg', // rating
        d:'mm' //default
      })
      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        avatar,
        password:req.body.password
      });

      bcypt.genSalt(10,(err,salt) => {
         bcypt.hash(newUser.password,salt, (err,hash) => {
           if(err) throw err;
           newUser.password = hash;
           newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
         })
      })
    }
  });
});

//   @route api/users/login
//   @desc  route for users to login and generate jwt
//   @access public  

router.post('/login',(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({email})
   .then(user => {
     if(!user){
       return res.status(404).json({email:'User not found'});
     }

     //check for the password
     bcypt.compare(password,user.password)
      .then(isMatched => {
        if(isMatched){
          // user matched
          const payload = {id:user.id,name:user.name,avatar:user.avatar};
          //sign a token
          jwt.sign(payload,
            keys.secretKey,
            { expiresIn:3600 },
            (err,token) => {
             res.json(
               {
                 success:true,
                 token:'Bearer ' + token
               });
            });
        }else{
          return res.status(400).json({password:'Password incorrect'});
        }
      });
   });
});

//   @route api/users/current
//   @desc  route for loged in users
//   @access private

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
   res.json(req.user);
});

module.exports = router;
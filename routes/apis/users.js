const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcypt = require('bcryptjs');

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

module.exports = router;
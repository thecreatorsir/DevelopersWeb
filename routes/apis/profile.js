const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//   @route api/profile/test
//   @desc test route for profile
//   @access public 
router.get('/test',(req,res)  => res.json({
  msg : "profile route",
}))

//   @route api/profile
//   @desc current user profile
//   @access private 

router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
  const errors = {};
  Profile.findOne({user:req.user.id})
  .then(profile => {
      if(!profile){
        errors.noprofile = 'No profile available for the current user';
        return res.status(404).json(errors);
      }else{
        return res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});
module.exports = router;
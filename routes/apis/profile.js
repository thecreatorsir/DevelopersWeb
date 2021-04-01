const express = require('express');

const router = express.Router();

//   @route api/profile/test
//   @desc test route for profile
//   @access public 
router.get('/test',(req,res)  => res.json({
  msg : "profile route",
}))

module.exports = router;
const express = require('express');

const router = express.Router();

//   @route api/users/test
//   @desc test route for users
//   @access public      
router.get('/test',(req,res)  => res.json({
  msg : "users route",
}))

module.exports = router;
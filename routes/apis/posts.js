const express = require('express');

const router = express.Router();

//   @route api/posts/test
//   @desc test route for posts
//   @access public 
router.get('/test',(req,res)  => res.json({
  msg : "posts route",
}))

module.exports = router;
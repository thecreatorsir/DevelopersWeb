const express = require("express");
const passport = require("passport");
const Post = require("../../models/Post");

const router = express.Router();

//validation
const validatePostInput = require("../../validator/post");

//   @route api/posts/test
//   @desc test route for posts
//   @access public
router.get("/test", (req, res) =>
  res.json({
    msg: "posts route",
  })
);

//   @route POST api/posts
//   @desc Create posts
//   @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newPost = {};
    newPost.text = req.body.text;
    newPost.name = req.body.name;
    newPost.avatar = req.body.avatar;
    newPost.user = req.user.id;

    new Post(newPost).save().then((post) => res.json(post));
  }
);

module.exports = router;

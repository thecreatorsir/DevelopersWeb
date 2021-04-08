const express = require("express");
const { session } = require("passport");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

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

//   @route GET api/posts
//   @desc Get posts
//   @access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No post found" }));
});

//   @route GET api/posts/:id
//   @desc Get post by id
//   @access public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with this ID" })
    );
});

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

//   @route DELETE api/posts/:id
//   @desc delete posts
//   @access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //check for the ownership
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) => res.status(404).json({ nopostfound: "No post found" }));
    });
  }
);

//   @route POST api/posts/like/:id
//   @desc  like posts
//   @access private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            //like already exist
            return res
              .status(400)
              .json({ alreadyliked: "You have already liked this post" });
          }

          //else add user to liked list
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ nopostfound: "No post found" }));
    });
  }
);

//   @route POST api/posts/unlike/:id
//   @desc  unlike posts
//   @access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            //not liked yet
            return res
              .status(400)
              .json({ notliked: "You have not liked this post yet" });
          }

          //else unlike post
          const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ nopostfound: "No post found" }));
    });
  }
);

//   @route POST api/posts/comment/:id
//   @desc  Add comment to posts
//   @access private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        //add comment to post
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ nopostfound: "No post found" }));
  }
);

//   @route DELETE api/posts/comment/:id/:comment_id
//   @desc  Delete comment to posts
//   @access private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check for comment
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ nocomment: "Comment does not exists" });
        }

        //else delete comment to post
        const removeIndex = post.comments
          .map((comment) => comment._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ nopostfound: "No post found" }));
  }
);
module.exports = router;

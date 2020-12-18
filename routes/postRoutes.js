const express = require("express");
const {
  getHomePage,
  getSinglePost,
  getEditPost,
  editPost,
  deletePost,
  getAuthenticatedPost,
  createPost,
  landingPage,
} = require("../controllers/post");

const router = express.Router();
const auth = require("../middleware/auth");

//geting all the post...
router.get("/home", getHomePage);
router.get("/", landingPage);

router.get("/post/:id", getSinglePost);

router.get("/post/:id/edit", getEditPost);

router.put("/post/:id", editPost);

router.delete("/post/:id", deletePost);

router.get("/post", auth, getAuthenticatedPost);

router.post("/post", createPost);

module.exports = router;

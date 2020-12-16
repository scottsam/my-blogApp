const { postComment } = require("../controllers/comment");

const express = require("express");
const router = express.Router();

router.post("/post/comments", postComment);

module.exports = router;

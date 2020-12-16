const Comment = require("../models/comment");

exports.postComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.redirect(`/post/${comment.postId}`);
  } catch (err) {
    console.log(err.message);
  }
};

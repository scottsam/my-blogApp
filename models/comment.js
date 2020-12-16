const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const commentSchema = new mongoose.Schema({
  username: String,
  comment: String,
  postId: { type: ObjectId, ref: "Post" },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

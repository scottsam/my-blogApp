const Post = require("../models/Post");
const Comment = require("../models/comment");
const path = require("path");

exports.getHomePage = async (req, res) => {
  //let page = parseInt(req.query.page);
  //let limit = 4;
  // let skip = (page - 1) * limit;
  const { userId } = req.session;
  const posts = await Post.find({});
  let index = posts.length;
  let post = posts[index - 1];

  //const count = await Post.countDocuments({});
  //const allPost = await Post.find({}).skip(skip).limit(limit);
  //const totalPage = Math.ceil(count / limit);

  res.render("index", {
    posts,
    userId,
    post,
  });
};

exports.getSinglePost = async (req, res) => {
  try {
    let id = req.params.id;
    const post = await Post.findById({ _id: id });
    // fetching comments
    const comments = await Comment.find({ postId: id });

    res.render("post", { post: post, comments: comments });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getEditPost = async (req, res) => {
  let id = req.params.id;
  const post = await Post.findById({ _id: id });
  res.render("post-edit", { post });
};

exports.editPost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.redirect(`/post/${post._id}`);
};

exports.deletePost = async (req, res) => {
  let id = req.params.id;
  const post = await Post.findByIdAndDelete({ _id: id });
  res.redirect(`/`);
};

exports.getAuthenticatedPost = (req, res) => {
  res.render("create");
};

exports.createPost = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).render("create", { message: "No picture was uploaded " });
  }
  let imgFile = req.files.image;
  let subPath = __dirname.slice(0, 28);
  let imgPath = path.join(subPath, "public", "img", imgFile.name);

  imgFile.mv(imgPath, (err) => {
    if (err) {
      res.status(500).render("create", { message: "Something went wrong!" });
    }
    const post = await Post.create({
    ...req.body,
    image: `/img/${imgFile.name}`,
  });
  res.redirect("/");
  });
  

  //image.mv(path.resolve(__dirname, "/uploads", image.name), (error) => {
  //Post.create(
  //{ ...req.body, image: `/posts/${image.name}` },
  //(error, post) => {
  //  res.redirect("/");
  // }
  //);
  //});
};

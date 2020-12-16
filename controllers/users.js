const authenticated = require("../middleware/redirectIfAuthenticated");
const User = require("../models/Users");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.render("register", {
        message: "User with the Email is already registered",
      });
    }

    //creating a new user
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.redirect("/");
  } catch (error) {
    res.redirect("/register");
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.render("login", { message: "email is incorrect" });

    let isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return res.redirect("/login");
    req.session.userId = user._id;

    res.redirect("/");
  } catch (err) {
    res.redirect("/login");
  }
};

exports.getRegister = (req, res) => {
  res.locals.message = req.flash("message");
  res.render("register");
};

exports.getLogin = (req, res) => {
  res.locals.message = req.flash("message");
  res.render("login");
};

exports.logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const User = require("../models/Users");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) return res.redirect("/");
  } catch (err) {
    console.log("There was an Error");
  }
  next();
};

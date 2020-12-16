const express = require("express");
const {
  register,
  login,
  getRegister,
  getLogin,
  logOut,
} = require("../controllers/users");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/register", getRegister);
router.get("/login", getLogin);
router.get("/logout", logOut);

module.exports = router;

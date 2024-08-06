// Đảm nhiệm logic của auth:
// 1. Đăng ký
// 2. Đăng nhập
// 3. Đăng xuất

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      // Hide => hash password
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new User
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      // Save in Database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      // Find username
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong Username!");
      }

      // Compare Password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong Password!");
      }

      // If User and Password is correct
      if (user && validPassword) {
        return res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;

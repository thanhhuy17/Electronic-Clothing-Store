// Đảm nhiệm logic của auth:
// 1. Đăng ký
// 2. Đăng nhập
// 3. Đăng xuất

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Save RefreshToken
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
  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },
  //GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
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
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        // Gắn cookie -> refresh token
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false, // Khi deloy set true
          path: "/",
          sameSite: "strict",
        });

        // Hide Password
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //REFRESH TOKEN // REDIS
  requestRefreshToken: (req, res) => {
    // Take Request from USer
    const refreshToken = req.headers.refreshToken; // Take Cookie. <=> RefreshToken
    // res.status(200).json(refreshToken);
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated!"); // Don't Login
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("RefreshToken is not valid!");
    }

    //---------------- IMPORTANT ---------------------
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      // Create new AccessToken and New RefreshToken
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      // Gắn cookie -> refresh token
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // LOGOUT
  userLogout: (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json("Logged Out successfully !");
  },
};

module.exports = authController;

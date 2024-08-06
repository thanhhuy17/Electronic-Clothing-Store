const authController = require("../controllers/authcontroller");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

// REGISTER
router.post("/register", authController.registerUser);

// LOGIN
router.post("/login", authController.loginUser);

// REFRESH
router.post("/refresh", authController.requestRefreshToken);

// LOGOUT
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;

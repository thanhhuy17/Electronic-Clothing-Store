const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/usercontroller");

const router = require("express").Router();

//GET ALL USERS
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER
router.delete(
  "/:id",
  middlewareController.verifyTokenForAdmin,
  userController.deleteUser
);
module.exports = router;

const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.delete("/logout", authMiddleware.protect, userController.logout);
router.post("/refreshToken", userController.requestRefreshToken);

router
  .route("/profile")
  .get(authMiddleware.protect, userController.getUserProfile)
  .put(authMiddleware.protect, userController.updateUserProfile);
router.put(
  "/updatePassword",
  authMiddleware.protect,
  userController.updatePassword
);

router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.checkRole("admin"),
  userController.getAllUsers
);
router
  .route("/:id")
  .get(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    userController.getUserById
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    userController.updateUser
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    userController.deleteUser
  );

module.exports = router;

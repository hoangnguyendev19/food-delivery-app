const express = require("express");
const foodController = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(foodController.getAllFoods)
  .post(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    foodController.createFood
  );

router
  .route("/:id/reviews")
  .post(authMiddleware.protect, foodController.createFoodReview);

router
  .route("/:id")
  .get(foodController.getFood)
  .patch(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    foodController.updateFood
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    foodController.deleteFood
  );

module.exports = router;

const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware.protect, orderController.addOrderItems)
  .get(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    orderController.getOrders
  );

router
  .route("/myorders")
  .get(authMiddleware.protect, orderController.getMyOrders);

router.route("/:id").get(authMiddleware.protect, orderController.getOrderById);

router
  .route("/:id/pay")
  .patch(authMiddleware.protect, orderController.updateOrderToPaid);

router
  .route("/:id/deliver")
  .patch(
    authMiddleware.protect,
    authMiddleware.checkRole("admin"),
    orderController.updateOrderToDelivered
  );

module.exports = router;

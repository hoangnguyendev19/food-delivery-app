const express = require("express");
const foods = require("../data/foods");
const users = require("../data/users");
const Food = require("../models/foodModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const router = express.Router();

router.post(
  "/foods",
  asyncHandler(async (req, res) => {
    await Food.deleteMany({});
    const importFoods = await Food.insertMany(foods);
    res.status(200).json({
      status: "success",
      foods: importFoods,
    });
  })
);

router.post(
  "/users",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const importUsers = await User.insertMany(users);
    res.status(200).json({
      status: "success",
      users: importUsers,
    });
  })
);

module.exports = router;

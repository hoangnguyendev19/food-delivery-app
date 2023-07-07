const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

dotenv.config();

exports.protect = asyncHandler(async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      throw new Error(
        "You have'nt logged in yet. Please log in to get access!"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401);
      throw new Error(
        "The user belonging to this token does no longer exist. Please log in again!"
      );
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Err: ", error);
    res.status(401);
    throw new Error(error.message);
  }
});

exports.checkRole = (role) => {
  return asyncHandler(async (req, res, next) => {
    if (req.user.role !== role) {
      res.status(403);
      throw new Error("You don't have permission to perform this action!");
    }

    next();
  });
};

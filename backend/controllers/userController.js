const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { signToken, signRefreshToken } = require("../utils/signToken");

let refreshTokenList = [];

// refreshToken
exports.requestRefreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      status: "fail",
      message: "You have'nt logged in yet. Please log in to get access!",
    });
  }

  if (!refreshTokenList.includes(refreshToken)) {
    return res.status(403).json({
      status: "fail",
      message: "Refresh token is invalid",
    });
  }

  refreshTokenList = refreshTokenList.filter((token) => token !== refreshToken);

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const newAccessToken = signToken(decoded.id);
  const newRefreshToken = signRefreshToken(decoded.id);

  refreshTokenList.push(newRefreshToken);

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    accessToken: newAccessToken,
  });
});

/*--------User--------- */

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password is required");
  }

  let user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Email or password is invalid");
  }

  const isValidPassword = await user.checkPassword(password, user.password);

  if (!isValidPassword) {
    res.status(404);
    throw new Error("Email or password is invalid");
  }

  const accessToken = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  refreshTokenList.push(refreshToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
  });

  user = await User.findOne({ email }).select("-password");

  return res.status(200).json({
    status: "success",
    data: {
      user,
      accessToken,
    },
  });
});

// Register
exports.signup = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const newUser = await User.create(req.body);

  const accessToken = signToken(newUser._id);

  if (newUser) {
    const user = await User.findById(newUser._id).select("-password");
    return res.status(200).json({
      status: "success",
      data: {
        user,
        accessToken,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Logout
exports.logout = asyncHandler(async (req, res) => {
  refreshTokenList = refreshTokenList.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({
    status: "success",
    message: "You logged out successfully!",
  });
});

// User profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update password
exports.updatePassword = asyncHandler(async (req, res) => {
  const { password, newPassword, confirmedNewPassword } = req.body;
  const user = await User.findById(req.user._id);
  const isValidPassword = await user.checkPassword(password, user.password);

  if (!isValidPassword) {
    res.status(404);
    throw new Error("Old password is invalid");
  }

  user.password = newPassword;
  user.confirmedPassword = confirmedNewPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "You updated password successfully!",
  });
});

// Update user profile
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const newUser = await User.findByIdAndUpdate(req.user._id, req.body);

  const user = await User.findById(req.user._id).select("-password");

  const accessToken = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    data: {
      user,
      accessToken,
    },
  });
});

/*-------Admin-------- */

// All Users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({
    status: "success",
    data: {
      users: allUsers,
    },
  });
});

// Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// User by id
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.body);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

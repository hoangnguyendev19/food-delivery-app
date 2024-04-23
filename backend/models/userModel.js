const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      minlength: [3, "Full name must be at least three character"],
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Email is invalid."],
      required: [true, "Please enter your email!"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least six characters"],
      required: [true, "Please enter your password"],
    },
    confirmedPassword: {
      type: String,
      required: [true, "Please retype your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords must be match",
      },
      select: false,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.confirmedPassword = undefined;
  next();
});

userSchema.methods.checkPassword = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model("users", userSchema);

module.exports = User;

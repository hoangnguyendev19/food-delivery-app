const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true,
      minLength: [6, "Name have at least six characters"],
    },
    category: {
      type: String,
      enum: ["burger", "pizza", "bread"],
      required: [
        true,
        "Category is required. Category includes burger, pizza and bread",
      ],
      lowercase: true,
    },
    price: {
      type: Number,
      min: [10, "Price have at least 10"],
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    imageDetails: {
      type: Array,
      default: [],
    },
    discount: Number,
    desc: {
      type: String,
      minLength: [10, "Description have at least 10 characters"],
      required: [true, "Description is required"],
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("foods", foodSchema);

module.exports = Food;

const Food = require("../models/foodModel");
const asyncHandler = require("express-async-handler");

exports.createFoodReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const food = await Food.findById(req.params.id);

  if (food) {
    const alreadyReviewed = food.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Food already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    food.reviews.push(review);

    food.numReviews = food.reviews.length;

    food.rating =
      food.reviews.reduce((acc, item) => item.rating + acc, 0) /
      food.reviews.length;

    await food.save();
    res.status(201).json({
      status: "success",
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Food not found");
  }
});

exports.getAllFoods = asyncHandler(async (req, res) => {
  // 1. Filter: category
  let reqQuery = { ...req.query };
  const excludedFields = ["page", "limit", "sort"];
  excludedFields.filter((el) => delete reqQuery[el]);
  const count = await Food.find().count();

  reqQuery = JSON.stringify(reqQuery);
  reqQuery = reqQuery.replace("gt", "$gt");
  reqQuery = JSON.parse(reqQuery);
  let query = Food.find(reqQuery);

  // 2. Sort: name, price
  if (req.query.sort) {
    const querySort = req.query.sort.split(",").join(" ");
    query = query.sort(querySort);
  } else {
    query = query.sort("createdAt");
  }

  // 3. Paginate
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const skipItems = (page - 1) * limit;

  query = query.skip(skipItems).limit(limit);

  const allFoods = await query;

  res.status(200).json({
    status: "success",
    data: {
      foods: allFoods,
      page,
      pageTotal: Math.ceil(count / limit),
    },
  });
});

exports.getFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      food,
    },
  });
});

exports.createFood = asyncHandler(async (req, res) => {
  const newFood = await Food.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      food: newFood,
    },
  });
});

exports.updateFood = asyncHandler(async (req, res) => {
  const newFood = await Food.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      food: newFood,
    },
  });
});

exports.deleteFood = asyncHandler(async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

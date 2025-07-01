import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      user: req.user._id, // From auth middleware
    };

    const review = await Review.create(reviewData);
    res.status(201).json({ status: "success", data: review });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "firstName").populate("product", "name");
    res.status(200).json({ status: "success", count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate("user", "firstName");
    res.status(200).json({ status: "success", count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // only allow user to update own review
      req.body,
      { new: true, runValidators: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found or not yours" });
    res.status(200).json({ status: "success", data: review });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) return res.status(404).json({ message: "Review not found or not yours" });
    res.status(200).json({ status: "success", message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

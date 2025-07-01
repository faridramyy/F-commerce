// 📁 models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, maxlength: 2000 },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [String],
      validate: [(arr) => arr.length > 0, "At least one image"],
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    numReviews: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;

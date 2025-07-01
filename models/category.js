// 📁 models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
      unique: true,
    },
    image: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


const Category = mongoose.model("Category", categorySchema);
export default Category;

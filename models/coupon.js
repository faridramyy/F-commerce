// 📁 models/Coupon.js
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9]{4,12}$/, "Coupon code must be 4-12 alphanumerics"],
    },
    discountType: { type: String, enum: ["percent", "fixed"], required: true },
    amount: { type: Number, required: true, min: 1 },
    minOrderAmount: { type: Number, min: 0, default: 0 },
    maxDiscountAmount: { type: Number, min: 0 },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

couponSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;

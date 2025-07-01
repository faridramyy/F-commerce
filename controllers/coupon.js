import Coupon from "../models/Coupon.js";

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ status: "success", data: coupon });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", count: coupons.length, data: coupons });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getCouponByCode = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      code: req.params.code.toUpperCase(),
      isActive: true,
      expiresAt: { $gt: new Date() },
    });

    if (!coupon) return res.status(404).json({ message: "Invalid or expired coupon" });
    res.status(200).json({ status: "success", data: coupon });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Coupon not found" });
    res.status(200).json({ status: "success", data: updated });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Coupon not found" });
    res.status(200).json({ status: "success", message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

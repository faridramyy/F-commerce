import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      user: req.user._id,
    };

    const order = await Order.create(orderData);
    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "firstName email").sort({ createdAt: -1 });
    res.status(200).json({ status: "success", count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { paymentStatus, deliveryStatus } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, deliveryStatus },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ status: "success", data: updated });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ status: "success", message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

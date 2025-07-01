import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.status(200).json({ status: "success", data: { items: [] } });
    res.status(200).json({ status: "success", data: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { product, quantity = 1 } = req.body;

    const foundProduct = await Product.findById(product);
    if (!foundProduct) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    cart.addItem(product, quantity);
    await cart.save();
    res.status(200).json({ status: "success", message: "Item added to cart", data: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const updateItemQty = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.updateQuantity(product, quantity);
    await cart.save();

    res.status(200).json({ status: "success", message: "Quantity updated", data: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.removeItem(productId);
    await cart.save();

    res.status(200).json({ status: "success", message: "Item removed", data: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.clearCart();
    await cart.save();

    res.status(200).json({ status: "success", message: "Cart cleared", data: cart });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  items: {
    type: [cartItemSchema],
    validate: [(arr) => arr.length > 0, "Cart cannot be empty"],
  },
  updatedAt: { type: Date, default: Date.now },
});

cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// ➕ Add or update item
cartSchema.methods.addItem = function (productId, qty = 1) {
  const index = this.items.findIndex((item) =>
    item.product.toString() === productId.toString()
  );

  if (index !== -1) {
    this.items[index].quantity += qty;
  } else {
    this.items.push({ product: productId, quantity: qty });
  }

  this.updatedAt = Date.now();
};

// ❌ Remove item
cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );
  this.updatedAt = Date.now();
};

// 🔁 Update quantity
cartSchema.methods.updateQuantity = function (productId, qty) {
  const item = this.items.find(
    (i) => i.product.toString() === productId.toString()
  );
  if (item) {
    item.quantity = qty;
    this.updatedAt = Date.now();
  }
};

// 🗑️ Clear cart
cartSchema.methods.clearCart = function () {
  this.items = [];
  this.updatedAt = Date.now();
};

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

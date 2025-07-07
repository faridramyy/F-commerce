import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Recipient name required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: [true, "Phone number required"],
      match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"],
    },
    street: { type: String, required: true, minlength: 3, maxlength: 100 },
    city: { type: String, required: true, minlength: 2, maxlength: 50 },
    state: { type: String, minlength: 2, maxlength: 50 },
    postalCode: {
      type: String,
      required: true,
      match: [/^[A-Za-z0-9- ]{3,10}$/, "Invalid postal code"],
    },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const cardSchema = new mongoose.Schema(
  {
    cardholderName: {
      type: String,
      required: [true, "Cardholder name required"],
      minlength: 2,
      maxlength: 50,
    },
    cardNumber: {
      type: String,
      required: [true, "Card number required"],
      match: [/^\d{13,19}$/, "Invalid card number"],
    },
    expiry: {
      type: String,
      required: [true, "Expiry date required"],
      match: [/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY"],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name required"],
      minlength: 2,
      maxlength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name required"],
      minlength: 2,
      maxlength: 30,
      trim: true,
    },
    phone: {
      type: String,
      match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid e-mail"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: [8, "Password must be ≥ 8 chars"],
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    addresses: {
      type: [addressSchema],
      validate: [(arr) => arr.length <= 5, "Maximum 5 addresses"],
    },
    cards: {
      type: [cardSchema],
      validate: [(arr) => arr.length <= 5, "Maximum 5 cards"],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    credits: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastLogin: {
      type: Date,
    },
    isActiveEmail: {
      type: Boolean,
      default: false,
    },
    isActivePhone: {
      type: Boolean,
      default: false,
    },
    resetPasswordCode: {
      type: String,
      default: null,
    },
    resetPasswordCodeExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.setDefaultCard = function (cardIndex) {
  if (!this.cards[cardIndex]) {
    throw new Error("Card not found at specified index");
  }
  this.cards.forEach((card, i) => {
    card.isDefault = i === cardIndex;
  });
};

userSchema.methods.setDefaultAddress = function (addressIndex) {
  if (!this.addresses[addressIndex]) {
    throw new Error("Address not found at specified index");
  }
  this.addresses.forEach((address, i) => {
    address.isDefault = i === addressIndex;
  });
};

userSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

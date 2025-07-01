import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/* ---------- Auth ---------- */
export const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      data: {
        token,
        user: pickPublicFields(user),
      },
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      status: "success",
      data: { token, user: pickPublicFields(user) },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// purely client-side in SPA; this endpoint just keeps parity for future refresh-token flow
export const logout = (_req, res) =>
  res.status(200).json({ message: "Logged out successfully" });

/* ---------- CRUD (admin) ---------- */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: "success", data: pickPublicFields(user) });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ status: "success", count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ status: "success", data: updated });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ status: "success", message: "User deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

/* ---------- Helpers ---------- */
const pickPublicFields = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
});

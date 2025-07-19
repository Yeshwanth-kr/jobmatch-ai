import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "Please fill all details" });
  } else {
    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, name: name, password: hashed });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res
          .status(201)
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
          })
          .json({ message: "User registered" });
      }
    } catch (err) {
      console.log("Error in Signup Controller: ", err);
      res.status(500).json({ message: "Registration failed" });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send token via HTTP-Only Cookie
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .clearCookie("token")
    .json({ message: "Logged out" });
};

export const me = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findOne({ _id: id }, { password: 0, __v: 0 });
    return res.status(200).json(user);
  } catch (error) {}
};

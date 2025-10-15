import User from "../models/user.model.js";

import jwt from "jsonwebtoken"
import WhistleBlower from "../models/whistleBlower.model.js";
import SuperUser from "../models/superuser.model.js";
import { nanoid } from "nanoid";

export const createWhistleBlower = async () => {
  const username = "user_" + nanoid(6);
  const password = nanoid(10);
  const newWhistleBlower = await WhistleBlower.create({ username, password });
  return { newWhistleBlower, username, password };
}

// login
export const whistlerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(404);
    const user = await WhistleBlower.findOne({ username })
    if (!user)
      return res.status(404).json({ message: "no user found", success: false });
    const token = user?.generateAccessToken();
    return res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,               // false for HTTP, true for HTTPS
  sameSite: "lax",
        // sameSite: "none",
        // secure: true,
      })
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        success: true,
        message: `Welcome back ${user?.username?.toUpperCase()}`,
      });
  } catch (error) {
    console.log("error in user login", error)
  }
};

// user register
export const userRegister = async (req, res) => {
  try {
    const { username, password, email, department, state } = req.body;
    if (!username || !password || !email || !department || !state)
      return res.status(401).json({ message: "All field is required" });
    const newUser = new User({
      username,
      password,
      email,
      department,
      state
    });
    await newUser.save();
    return res.status(200).json({ message: "user successfully created", success: true });
  } catch (error) {
    console.log("user register", error)
  }
};

export const superUserRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email)
      return res.status(401).json({ message: "All field is required" });
    const newUser = new SuperUser({
      username,
      password,
      email,
    });
    await newUser.save();
    return res.status(200).json({ message: "superuser successfully created", success: true });
  } catch (error) {
    console.log("Super Register :: ", error)
  }
}

export const superUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404);
    const user = await SuperUser.findOne({ email })
    if (!user)
      return res.status(404).json({ message: "no user found", success: false })
    const token = user.generateAccessToken();
    return res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,               // false for HTTP, true for HTTPS
  sameSite: "lax",
        // sameSite: "none",
        // secure: true,
      })
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        success: true,
        message: `Welcome back ${user?.username?.toUpperCase()}`,
      });
  } catch (error) {
    console.log("error Super User  login", error)
  }
}

// login whistle
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404);
    const user = await User.findOne({ email })
    if (!user)
      return res.status(404).json({ message: "no user found", success: false })
    const token = user.generateAccessToken();
    return res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,               // false for HTTP, true for HTTPS
  sameSite: "lax",
        // sameSite: "none",
        // secure: true,
      })
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        success: true,
        message: `Welcome back ${user?.username?.toUpperCase()}`,
      });
  } catch (error) {
    console.log("error whistle login", error)
  }
};





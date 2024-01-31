import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Store from "../models/store.js";

import { createError } from "../utils/createError.js";
import Jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const pass = "123";

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(pass, salt);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    let userData;
    if (newUser.role === "sm") {
      const storeData = await Store.findById(newUser.store.toString());
      const { store, ...others } = newUser;
      const storeName = `${storeData.storeLocation}(${storeData.storeName})`;
      userData = { storeName, ...others._doc };
    }
    newUser.role === "sm"
      ? res.status(200).send(userData)
      : res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "wrong Email"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Wrong password"));
    const token = Jwt.sign({ id: user._id, role: user.role }, process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import user from "../models/Usermodel.mjs";

dotenv.config();
const Secret_Key = process.env.SECRET_key;

export const postuser = async (req, res) => {
  try {
    const _user = new user(req.body);
    const Saveuser = await _user.save();
    res.status(200).json({ message: "done", user: Saveuser });
  } catch (error) {
    const err = saveuserErrorHandler(error);
    res.status(400).json(err);
  }
};

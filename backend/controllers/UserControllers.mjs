import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import user from "../models/Usermodel.mjs";
import UserAccount from "../models/UserAccount.mjs"; // Ensure this import is correct based on your directory structure

dotenv.config();
const Acess_Token_Secret_Key = process.env.SECRET_key;

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const loginuser = await user.findOne({ email });

    if (!loginuser) {
      return res.status(401).json({ error: "No user found in the database" });
    }

    const match = await bcrypt.compare(password.trim(), loginuser.password);

    if (match) {
      const expiresIn = Date.now() + 24 * 60 * 60 * 1000;
      const Access_token = jwt.sign(
        { userId: loginuser._id, email: loginuser.email },
        Acess_Token_Secret_Key,
        { expiresIn: `${expiresIn}s` }
      );

      // Check if the user has connected a bank account
      const userAccount = await UserAccount.findOne({ userId: loginuser._id });
      const bankAccountConnected = userAccount ? true : false;

      res.status(200).json({
        message: "Login successful",
        Access_token,
        expiresIn,
        bankAccountConnected, // Include the flag in the response
      });
    } else {
      console.log("Password does not match");
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

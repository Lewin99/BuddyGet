import dotenv from "dotenv";
import Budget from "../models/Budgetmodel.mjs";

dotenv.config();

export const postBudget = async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();
    res
      .status(200)
      .json({ message: "Budget saved successfully", budget: savedBudget });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

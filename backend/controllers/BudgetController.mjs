import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Budget from "../models/Budgetmodel.mjs";

dotenv.config();

export const postBudget = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_key);
  } catch (error) {
    return res.status(403).send("Invalid authorization token");
  }

  const userId = decoded.userId;

  try {
    const newBudget = new Budget({ ...req.body, userId });
    const savedBudget = await newBudget.save();
    return res
      .status(200)
      .json({ message: "Budget saved successfully", budget: savedBudget });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getBudgets = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_key);
  } catch (error) {
    return res.status(403).send("Invalid authorization token");
  }

  const userId = decoded.userId;

  try {
    const budgets = await Budget.find({ userId });
    return res.status(200).json({ budgets });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBudgetById = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    return res.status(200).json({ budget });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBudgetById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    return res
      .status(200)
      .json({ message: "Budget updated successfully", budget: updatedBudget });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBudgetById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    return res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateActualSpending = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    budget.actualSpending += amount;
    // Ensure all required fields are present
    budget.markModified("actualSpending");
    await budget.save();
    res.status(200).json({ budget });
  } catch (error) {
    console.error("Error updating actual spending:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

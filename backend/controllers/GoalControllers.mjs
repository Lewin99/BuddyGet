import Goal from "../models/Goal.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const Access_Token_Secret_Key = process.env.SECRET_key;

export const createGoal = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, Access_Token_Secret_Key);
  } catch (error) {
    return res.status(403).send("Invalid authorization token");
  }

  const { userId } = decoded;
  const { name, targetAmount, currentAmount, description } = req.body;

  if (!name || !targetAmount || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newGoal = new Goal({
      userId,
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
      description,
    });
    const savedGoal = await newGoal.save();
    res.status(201).json({ goal: savedGoal });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGoals = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, Access_Token_Secret_Key);
  } catch (error) {
    return res.status(403).send("Invalid authorization token");
  }

  const userId = decoded.userId;

  try {
    const goals = await Goal.find({ userId });
    res.status(200).json({ goals });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

export const updateGoal = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, Access_Token_Secret_Key);
  } catch (error) {
    return res.status(403).send("Invalid authorization token");
  }

  const { id } = req.params;
  const { amount } = req.body;

  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goal.userId.toString() !== decoded.userId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    if (goal.currentAmount + amount > goal.targetAmount) {
      return res.status(400).json({ error: "Exceeds target amount" });
    }

    goal.currentAmount += amount;
    goal.updatedAt = Date.now();
    const updatedGoal = await goal.save();
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update goal" });
  }
};

export const deleteGoal = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, Access_Token_Secret_Key);
  } catch (error) {
    return res.status(403).json({ error: "Invalid authorization token" });
  }

  const { id } = req.params;

  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    if (goal.userId.toString() !== decoded.userId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await goal.deleteOne();
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ error: "Failed to delete goal" });
  }
};

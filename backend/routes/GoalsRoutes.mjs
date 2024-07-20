// routes/goalRoutes.js
import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/GoalControllers.mjs";

const Goalrouter = express.Router();

Goalrouter.post("/CreateGoal", createGoal);
Goalrouter.get("/GetGoals", getGoals);
Goalrouter.put("/UpdateGoal/:id", updateGoal);
Goalrouter.delete("/DeleteGoal/:id", deleteGoal);

export default Goalrouter;

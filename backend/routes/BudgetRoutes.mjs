import express from "express";
import { postBudget } from "../controllers/BudgetController.mjs";

const Budgetrouters = express.Router();

Budgetrouters.post("/CreateBudget", postBudget);
export default Budgetrouters;

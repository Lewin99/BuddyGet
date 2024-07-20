import express from "express";
import {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
  updateActualSpending,
} from "../controllers/BudgetController.mjs";

const Budgetrouters = express.Router();

Budgetrouters.post("/CreateBudget", postBudget);
Budgetrouters.get("/GetBudgets", getBudgets);
Budgetrouters.get("/GetBudget/:id", getBudgetById);
Budgetrouters.put("/UpdateBudget/:id", updateBudgetById);
Budgetrouters.delete("/DeleteBudget/:id", deleteBudgetById);
Budgetrouters.put("/UpdateActualSpending/:id", updateActualSpending);

export default Budgetrouters;

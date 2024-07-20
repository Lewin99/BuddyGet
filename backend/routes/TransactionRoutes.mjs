import express from "express";
import {
  fetchAndSaveTransactions,
  getTransactions,
} from "../controllers/TransactionControllers.mjs";

const Transactionrouters = express.Router();

Transactionrouters.post("/FetchandSaveTransactions", fetchAndSaveTransactions);
Transactionrouters.post("/GetTransactions", getTransactions);

export default Transactionrouters;

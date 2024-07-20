// models/Transaction.js
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountId: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  category: { type: [String], required: true },
  pending: { type: Boolean, required: true },
  transactionType: { type: String, required: true },
  location: {
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
  },
  merchantName: String,
  paymentChannel: String,
  isoCurrencyCode: String,
  unofficialCurrencyCode: String,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;

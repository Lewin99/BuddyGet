import jwt from "jsonwebtoken";
import client from "../src/Plaid_client.mjs";
import UserAccount from "../models/UserAccount.mjs";
import Transaction from "../models/TransactionModel.mjs";

// Fetch and Save Transactions from Plaid
export const fetchAndSaveTransactions = async (req, res) => {
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
    const userAccount = await UserAccount.findOne({ userId });

    if (!userAccount) {
      return res.status(404).send("User account not found");
    }

    const { accessToken } = userAccount;

    // Define the date range for transactions
    const startDate = "2020-01-01"; // Adjust as necessary
    const endDate = new Date().toISOString().split("T")[0]; // Current date

    // Fetch transactions from Plaid
    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });

    const transactions = response.data.transactions;

    // Save transactions to the database
    for (const transaction of transactions) {
      const transactionData = new Transaction({
        userId,
        accountId: transaction.account_id,
        transactionId: transaction.transaction_id,
        amount: transaction.amount,
        date: transaction.date,
        name: transaction.name,
        category: transaction.category,
        pending: transaction.pending,
        transactionType: transaction.transaction_type,
        location: {
          address: transaction.location.address,
          city: transaction.location.city,
          region: transaction.location.region,
          postalCode: transaction.location.postal_code,
          country: transaction.location.country,
        },
        merchantName: transaction.merchant_name,
        paymentChannel: transaction.payment_channel,
        isoCurrencyCode: transaction.iso_currency_code,
        unofficialCurrencyCode: transaction.unofficial_currency_code,
      });

      await transactionData.save();
    }

    res.json({ status: "success", transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get Transactions from the Database
export const getTransactions = async (req, res) => {
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
    const transactions = await Transaction.find({ userId }).sort({ date: -1 }); // Sort by date descending
    res.json({ status: "success", transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

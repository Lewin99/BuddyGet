import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountId: { type: String, required: true },
  name: { type: String, required: true },
  mask: { type: String, required: true },
  type: { type: String, required: true },
  subtype: { type: String, required: true },
  balances: {
    available: Number,
    current: Number,
    limit: Number,
  },
});

const Account = mongoose.model("Account", AccountSchema);
export default Account;

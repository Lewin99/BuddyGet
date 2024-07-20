import mongoose from "mongoose";

const UserAccountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  accessToken: { type: String, required: true },
  institutionId: { type: String, required: true },
  institutionName: { type: String, required: true },
  totalBalance: { type: Number, default: 0 },
});

const UserAccount = mongoose.model("UserAccount", UserAccountSchema);
export default UserAccount;

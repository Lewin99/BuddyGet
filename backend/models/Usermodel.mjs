import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { isEmail } = validator;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter password"],
    unique: true,
    validate: [isEmail, "please insert a valid email"],
  },

  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "the minimum number of characters is 6"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = mongoose.model("user", userSchema);
export default user;

import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for items in the budget
const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
  },
  allocatedAmount: {
    type: Number,
    required: [true, "Allocated amount is required"],
  },
});

// Define the schema for budgets
const budgetSchema = new Schema({
  name: {
    type: String,
    required: [true, "Budget name is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
  actualSpending: {
    type: Number,
    default: 0, // Default actual spending to 0 if not provided
  },
  items: {
    type: [itemSchema],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "There must be at least one item",
    },
  },
});

// Create the model from the schema
const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;

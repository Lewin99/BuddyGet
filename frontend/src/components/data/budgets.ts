export interface BudgetCategory {
  name: string;
  allocatedAmount: number;
  actualSpending: number;
}
export interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "Income" | "Expense";
}

interface Fin {
  month: String;
  amountIncome: number;
  amountExpense: number;
  amountSaved: number;
}

export interface Budget {
  name: string;
  startDate: string;
  endDate: string;
  categories: BudgetCategory[];
  totalBudget: number;
  totalSpending: number;
}

export interface BudgetData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export const finData: Fin = {
  month: "January",
  amountIncome: 5000,
  amountExpense: 3000,
  amountSaved: 2000,
};

export const budgets: Budget[] = [
  {
    name: "Monthly Expenses",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    categories: [
      {
        name: "Groceries",
        allocatedAmount: 500,
        actualSpending: 380,
      },
      {
        name: "Clubbing",
        allocatedAmount: 500,
        actualSpending: 380,
      },
      {
        name: "Netflix",
        allocatedAmount: 500,
        actualSpending: 380,
      },
      {
        name: "Entertainment",
        allocatedAmount: 200,
        actualSpending: 150,
      },
      {
        name: "Utilities",
        allocatedAmount: 300,
        actualSpending: 280,
      },
    ],
    totalBudget: 1000,
    totalSpending: 810,
  },
  {
    name: "School Fees",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    categories: [
      {
        name: "Tuition",
        allocatedAmount: 1500,
        actualSpending: 1200,
      },
      {
        name: "Books",
        allocatedAmount: 200,
        actualSpending: 180,
      },
    ],
    totalBudget: 1700,
    totalSpending: 1380,
  },
  {
    name: "Vacation Fund",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    categories: [
      {
        name: "Airfare",
        allocatedAmount: 800,
        actualSpending: 0,
      },
      {
        name: "Accommodation",
        allocatedAmount: 1000,
        actualSpending: 0,
      },
      {
        name: "Activities",
        allocatedAmount: 500,
        actualSpending: 0,
      },
    ],
    totalBudget: 2300,
    totalSpending: 0,
  },
];

export const transactions: Transaction[] = [
  {
    date: "2024-02-15",
    description: "Grocery shopping at XYZ supermarket",
    category: "Groceries",
    amount: 50.75,
    type: "Expense",
  },
  {
    date: "2024-02-14",
    description: "Received paycheck from ABC Company",
    category: "Salary",
    amount: 2500.0,
    type: "Income",
  },
  {
    date: "2024-02-13",
    description: "Dinner at ABC restaurant with friends",
    category: "Dining Out",
    amount: 80.5,
    type: "Expense",
  },
];

interface Goal {
  _id: string;
  user_id: string;
  goal_name: string;
  target_amount: number;
  current_balance: number;
  progress: number;
  created_at: string; // consider using Date type if dates are manipulated
  updated_at: string; // consider using Date type if dates are manipulated
}

export const goals: Goal[] = [
  {
    _id: "goal_id_1",
    user_id: "user_id_1",
    goal_name: "Vacation Fund",
    target_amount: 5000,
    current_balance: 2500,
    progress: 50,
    created_at: "2024-02-16T10:00:00Z",
    updated_at: "2024-02-16T10:00:00Z",
  },
  {
    _id: "goal_id_2",
    user_id: "user_id_2",
    goal_name: "Emergency Fund",
    target_amount: 10000,
    current_balance: 7500,
    progress: 75,
    created_at: "2024-02-16T10:30:00Z",
    updated_at: "2024-02-16T10:30:00Z",
  },
  {
    _id: "goal_id_3",
    user_id: "user_id_3",
    goal_name: "New Laptop",
    target_amount: 2000,
    current_balance: 500,
    progress: 25,
    created_at: "2024-02-16T11:00:00Z",
    updated_at: "2024-02-16T11:00:00Z",
  },
  {
    _id: "goal_id_4",
    user_id: "user_id_1",
    goal_name: "Vacation Fund",
    target_amount: 5000,
    current_balance: 2500,
    progress: 50,
    created_at: "2024-02-16T10:00:00Z",
    updated_at: "2024-02-16T10:00:00Z",
  },
  {
    _id: "goal_id_5",
    user_id: "user_id_4",
    goal_name: "Bommerang Concert",
    target_amount: 15000,
    current_balance: 5500,
    progress: 50,
    created_at: "2024-02-16T10:00:00Z",
    updated_at: "2024-02-16T10:00:00Z",
  },
];

import React from "react";
import { Bar } from "react-chartjs-2";
import { format, subMonths } from "date-fns";

interface Transaction {
  userId: string;
  accountId: string;
  transactionId: string;
  amount: number;
  date: string;
  name: string;
  category: string[];
  pending: boolean;
  transactionType: string;
  location: {
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  merchantName: string;
  paymentChannel: string;
  isoCurrencyCode: string;
  unofficialCurrencyCode: string;
}

const MonthlySpendingOverview: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const months = Array.from({ length: 5 }, (_, i) =>
    subMonths(new Date(), i)
  ).reverse();

  const data = {
    labels: months.map((date) => format(date, "yyyy-MM")),
    datasets: [
      {
        label: "Spending",
        data: months.map((month) => {
          const total = transactions
            .filter(
              (transaction) =>
                format(new Date(transaction.date), "yyyy-MM") ===
                format(month, "yyyy-MM")
            )
            .reduce((sum, transaction) => sum + transaction.amount, 0);
          return total;
        }),
        backgroundColor: months.map((month) => {
          const total = transactions
            .filter(
              (transaction) =>
                format(new Date(transaction.date), "yyyy-MM") ===
                format(month, "yyyy-MM")
            )
            .reduce((sum, transaction) => sum + transaction.amount, 0);
          return total < 0
            ? "rgba(255, 99, 132, 0.6)"
            : "rgba(75, 192, 192, 0.6)";
        }),
      },
    ],
  };

  return <Bar data={data} />;
};

export default MonthlySpendingOverview;

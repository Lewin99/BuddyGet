import React from "react";
import { Line } from "react-chartjs-2";
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

const TransactionTrends: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const months = Array.from({ length: 5 }, (_, i) =>
    subMonths(new Date(), i)
  ).reverse();
  const data = {
    labels: months.map((date) => format(date, "yyyy-MM")),
    datasets: [
      {
        label: "Number of Transactions",
        data: months.map(
          (month) =>
            transactions.filter(
              (transaction) =>
                format(new Date(transaction.date), "yyyy-MM") ===
                format(month, "yyyy-MM")
            ).length
        ),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return <Line data={data} />;
};

export default TransactionTrends;

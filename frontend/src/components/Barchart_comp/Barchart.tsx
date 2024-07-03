import React from "react";
import { Bar } from "react-chartjs-2";
import { budgets, Budget, BudgetData } from "../data/budgets";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { ChartContainer } from "./barchartStyles";

const Barchart: React.FC = () => {
  const { mode } = useTheme();
  const firstBudget: Budget = budgets[0];
  const budgetData = useState<BudgetData>({
    labels: firstBudget.categories.map((data) => data.name),
    datasets: [
      {
        label: "Allocated Amount",
        data: firstBudget.categories.map((data) => data.allocatedAmount),
        backgroundColor: "#7380ec",
        borderWidth: 1,
      },
      {
        label: "Actual Spending",
        data: firstBudget.categories.map((data) => data.actualSpending),
        backgroundColor: "#ff7782",
        borderWidth: 1,
      },
    ],
  })[0];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: mode === "dark" ? "#7d8da1" : "#46484a",
          font: {
            size: 14,
            family: "Verdana, Geneva, Tahoma, sans-serif",
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          color: mode === "dark" ? "#7d8da1" : "#46484a",
          font: {
            family: "Verdana, Geneva, Tahoma, sans-serif",
          },
        },
        ticks: {
          color: mode === "dark" ? "#7d8da1" : "#46484a",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          color: mode === "dark" ? "#7d8da1" : "#46484a",
          font: {
            family: "Verdana, Geneva, Tahoma, sans-serif",
          },
        },
        ticks: {
          color: mode === "dark" ? "#7d8da1" : "#46484a",
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Bar data={budgetData} options={options} />
    </ChartContainer>
  );
};

export default Barchart;

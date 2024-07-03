import React from "react";
import { goals } from "../data/budgets";
import {
  GoalsWrapper,
  GoalTitle,
  ProgressBar,
  ProgressBarParent,
  ProgressBarChild,
  GoalCard,
  GoalSmall,
  GoalCardH6,
  ProgressBarSmall,
} from "./FingoalsStyles";
import { useTheme } from "../contexts/ThemeContext";

const FinancialGoalsCard: React.FC = () => {
  const { mode } = useTheme();
  return (
    <GoalsWrapper
      theme={{
        background: mode === "dark" ? "#f6f6f9" : "#181a1e",
      }}
    >
      {goals.map((goal) => (
        <GoalCard key={goal._id}>
          <GoalTitle>
            <GoalCardH6>{goal.goal_name}</GoalCardH6>
            <GoalSmall>Target: {goal.target_amount}$</GoalSmall>
          </GoalTitle>
          <ProgressBar>
            <ProgressBarSmall>Saving: {goal.current_balance}$</ProgressBarSmall>
            <ProgressBarParent>
              <ProgressBarChild progress={goal.progress} />
            </ProgressBarParent>
          </ProgressBar>
        </GoalCard>
      ))}
    </GoalsWrapper>
  );
};

export default FinancialGoalsCard;

import React from "react";
import {
  MainWrapper,
  DashboardHeader,
  DashboardTitle,
  CardsWrapper,
  WalletMoney,
  DashboardHeadersection,
  Card,
  IconWrapper,
  IconSpan,
  CardTitle,
  CardAmount,
  LastUpdated,
  InfoWrapper,
  DataVisualsWrapper,
  BarchartCard,
  BarChartWrapper,
  Title,
  TitleFin,
  FinancialGoalsWrapper,
  StyledTextMuted,
} from "./DashmainStyles";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import Barchart from "../Barchart_comp/Barchart";
import FinancialGoalsCard from "../FinancialGoals_comp/FinancialGoalsCard";
import { useTheme } from "../contexts/ThemeContext";

const Main: React.FC = () => {
  const { mode } = useTheme();
  return (
    <MainWrapper>
      <div className="mywalletSummary">
        <DashboardHeader>
          <DashboardTitle>Dashboard</DashboardTitle>
        </DashboardHeader>

        <DashboardHeadersection>
          {" "}
          <CardsWrapper>
            <WalletMoney>
              <Card
                theme={{
                  textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
                  background: mode === "dark" ? "#181a1e" : "#f6f6f9",
                }}
              >
                <IconWrapper>
                  <IconSpan bgColor="#7380ec">
                    <AccountBalanceWalletOutlinedIcon />
                  </IconSpan>
                </IconWrapper>
                <InfoWrapper>
                  <CardTitle>My Wallet</CardTitle>
                  <CardAmount>$1000.000</CardAmount>
                </InfoWrapper>
                <LastUpdated>
                  <StyledTextMuted>Last 24 Hours</StyledTextMuted>
                </LastUpdated>
              </Card>
              <Card>
                <IconWrapper>
                  <IconSpan bgColor="#41f1b6">
                    <TrendingUpOutlinedIcon />
                  </IconSpan>
                </IconWrapper>
                <InfoWrapper>
                  <CardTitle>Income</CardTitle>
                  <CardAmount>$500.000</CardAmount>
                </InfoWrapper>
                <LastUpdated>
                  <StyledTextMuted>Last 24 Hours</StyledTextMuted>
                </LastUpdated>
              </Card>
              <Card>
                <IconWrapper>
                  <IconSpan bgColor="#ff7782">
                    <TrendingDownOutlinedIcon />
                  </IconSpan>
                </IconWrapper>
                <InfoWrapper>
                  <CardTitle>Expenses</CardTitle>
                  <CardAmount>$300.000</CardAmount>
                </InfoWrapper>
                <LastUpdated>
                  <StyledTextMuted>Last 24 Hours</StyledTextMuted>
                </LastUpdated>
              </Card>
            </WalletMoney>
          </CardsWrapper>
        </DashboardHeadersection>
      </div>

      {/* Data Visuals section */}
      <DataVisualsWrapper>
        <BarchartCard
          theme={{
            textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
            background: mode === "dark" ? "#181a1e" : "#f6f6f9",
          }}
        >
          <BarChartWrapper>
            <Title
              theme={{
                textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
              }}
            >
              Budgets Overview
            </Title>
            <Barchart />
          </BarChartWrapper>
        </BarchartCard>
        <FinancialGoalsWrapper
          theme={{
            textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
            background: mode === "dark" ? "#181a1e" : "#f6f6f9",
          }}
        >
          <TitleFin
            theme={{
              textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
            }}
          >
            Savings
          </TitleFin>
          <FinancialGoalsCard />
        </FinancialGoalsWrapper>
      </DataVisualsWrapper>
    </MainWrapper>
  );
};

export default Main;

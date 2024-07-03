// mainStyles.ts
import styled from "styled-components";

export const MainWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(132, 139, 200, 0.18);
`;

export const DashboardHeader = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
`;

export const DashboardTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: bolder;
  color: ${(props) => props.theme.color};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const DashboardHeadersection = styled.div`
  width: 100%;
  height: 30%;
`;

export const CardsWrapper = styled.div`
  width: 75%;
  margin-left: 10px;
`;

export const WalletMoney = styled.div`
  display: flex;
  margin-left: 50px;
  padding: 20px;
  justify-content: space-around;
  max-width: 100%;
`;

export const Card = styled.div`
  width: 30%;
  color: ${(props) => props.theme.textcolor};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  max-width: 300px;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  border-radius: 1.5rem;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
  border: 2px solid rgba(132, 139, 200, 0.18);
`;

export const IconWrapper = styled.div`
  padding: 8px;
  display: flex;
`;

export const IconSpan = styled.span<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  padding: 10px;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
`;

export const CardTitle = styled.h5`
  font-size: 0.6rem;
  margin-top: 5px;
`;

export const CardAmount = styled.p`
  font-size: 1rem;
  font-weight: bolder;
  margin-top: 10px;
`;

export const LastUpdated = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InfoWrapper = styled.div`
  padding: 5px;
`;

export const DataVisualsWrapper = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const BarchartCard = styled.div`
  width: 60%;
  background-color: ${(props) => props.theme.background};
  height: 90% auto;
  border: 2px solid rgba(132, 139, 200, 0.18);
  border-radius: 1.5rem;
`;

export const BarChartWrapper = styled.div`
  width: 98%;
  padding: 20px;
`;

export const Title = styled.h4`
  display: flex;
  color: ${(props) => props.theme.textcolor};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  padding: 10px;
`;

export const TitleFin = styled.h4`
  display: flex;
  color: ${(props) => props.theme.textcolor};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  padding-top: 25px;
`;

export const FinancialGoalsWrapper = styled.div`
  width: 35%;
  margin-left: 30px;
  background-color: ${(props) => props.theme.background};
  height: 60vh auto;
  border: 2px solid rgba(132, 139, 200, 0.18);
  border-radius: 1.5rem;
`;

export const StyledTextMuted = styled.small`
  color: #677483;
  font-size: 0.6rem;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

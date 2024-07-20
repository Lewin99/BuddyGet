import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useAuth from "../Hooks/useAuth";
import MonthlySpendingOverview from "../TransactionSpending_comp/MonthlySpendingOverview";
import TransactionTrends from "../TransactionTrends_comp/TransactionTrends";

const TransactionsContainer = styled(Container)`
  padding: 20px;
  background-color: #f8f9fa;
`;

const TransactionsTitle = styled.h2`
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
`;

const DateFiltersContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateFilter = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const FilterLabel = styled(Form.Label)`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FilterDatePicker = styled(DatePicker)`
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
  width: 100%;
  max-width: 150px;
  font-size: 14px; /* Reduced font size for placeholder */
`;

const TransactionsList = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const VisualizationContainer = styled.div`
  margin-bottom: 20px;
`;

const VisualizationTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

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

const TransactionsComponent: React.FC = () => {
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/Transactions/GetTransactions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify({ access_token: auth.accessToken }),
          }
        );
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [auth.accessToken]);

  const filteredTransactions = transactions.filter((transaction) => {
    if (!startDate || !endDate) return true;
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <TransactionsContainer>
      <TransactionsTitle>Transactions</TransactionsTitle>
      <Row>
        <Col md={6}>
          <VisualizationContainer>
            <VisualizationTitle>Monthly Spending Overview</VisualizationTitle>
            <MonthlySpendingOverview transactions={transactions} />
          </VisualizationContainer>
        </Col>
        <Col md={6}>
          <VisualizationContainer>
            <VisualizationTitle>Transaction Trends</VisualizationTitle>
            <TransactionTrends transactions={transactions} />
          </VisualizationContainer>
        </Col>
      </Row>
      <TransactionsList>
        <DateFiltersContainer>
          <Form>
            <Row>
              <Col>
                <DateFilter>
                  <FilterLabel>Start Date</FilterLabel>
                  <FilterDatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    className="form-control"
                    placeholderText="Select start date"
                  />
                </DateFilter>
              </Col>
              <Col>
                <DateFilter>
                  <FilterLabel>End Date</FilterLabel>
                  <FilterDatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    className="form-control"
                    placeholderText="Select end date"
                  />
                </DateFilter>
              </Col>
              <Col>
                <Button
                  onClick={clearFilters}
                  variant="secondary"
                  style={{ marginTop: "25px" }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </DateFiltersContainer>
        <h3>Transactions</h3>
        {filteredTransactions.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{format(new Date(transaction.date), "yyyy-MM-dd")}</td>
                  <td>{transaction.name}</td>
                  <td>
                    {transaction.isoCurrencyCode} {transaction.amount}
                  </td>
                  <td>{transaction.category.join(", ")}</td>
                  <td>{transaction.transactionType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No transactions found for the selected date range.</p>
        )}
      </TransactionsList>
    </TransactionsContainer>
  );
};

export default TransactionsComponent;

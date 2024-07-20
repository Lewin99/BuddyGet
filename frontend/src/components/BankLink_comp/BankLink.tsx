import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import {
  PlaidLink,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptionsWithLinkToken,
} from "react-plaid-link";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div`
  background-color: #181a1e;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Box = styled.div`
  text-align: center;
  background: white;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  max-width: 80px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 16px;
  margin-bottom: 25px;
`;

const Button = styled.button`
  background-color: #376698;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #417ebe;
  }
`;

const BankLinkComponent: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchLinkToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/CreateLinkToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (error) {
      console.error("Error fetching link token:", error);
    }
  };

  useEffect(() => {
    fetchLinkToken();
  }, []);

  const handleOnSuccess = async (
    publicToken: string,
    metadata: PlaidLinkOnSuccessMetadata
  ) => {
    try {
      console.log("Public Token:", publicToken);
      console.log("Metadata:", metadata);

      const exchangeResponse = await fetch(
        "http://localhost:5000/ExchangePublicToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify({
            public_token: publicToken,
            meta_data: metadata,
          }),
        }
      );
      const exchangeData = await exchangeResponse.json();
      const accessToken = exchangeData.access_token;

      console.log("Access Token:", accessToken);

      // Fetch transactions using the access token
      const transactionsResponse = await fetch(
        "http://localhost:5000/Transactions/FetchandSaveTransactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify({ access_token: accessToken }),
        }
      );
      const transactionsData = await transactionsResponse.json();

      // Display transactions in console
      console.log("Transactions Data:", transactionsData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in handling onSuccess:", error);
    }
  };

  const plaidLinkConfig: PlaidLinkOptionsWithLinkToken = {
    token: linkToken!,
    onSuccess: handleOnSuccess,
  };

  return (
    <Container>
      <Box>
        <Logo
          src="https://i.ibb.co/v30tzD8/pngaaa-com-4457319.png"
          alt="Logo"
        />
        <Title>Connect your bank account</Title>
        {linkToken ? (
          <PlaidLink {...plaidLinkConfig}>
            <Button>Connect a bank account</Button>
          </PlaidLink>
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Container>
  );
};

export default BankLinkComponent;

import React, { useState, useEffect } from "react";
import {
  PlaidLink,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptionsWithLinkToken,
} from "react-plaid-link";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div`
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

  const fetchLinkToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/CreateLinkToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleOnSuccess = (
    publicToken: string,
    metadata: PlaidLinkOnSuccessMetadata
  ) => {
    console.log("Public Token:", publicToken);
    console.log("Metadata:", metadata);
    fetch("http://localhost:5000/ExchangePublicToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Access Token:", data.access_token);
        // Store access token for future use
      })
      .catch((error) => console.error("Error exchanging public token:", error));
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

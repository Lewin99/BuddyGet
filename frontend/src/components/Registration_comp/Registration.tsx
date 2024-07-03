import React, { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { Email, Lock } from "@mui/icons-material";
import styled from "styled-components";

// Custom styled components
const CenteredContainer = styled(Container)`
  height: 100vh;
  background: #181a1e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  max-width: 100px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const CustomButton = styled(Button as any)`
  &&& {
    background-color: rgb(33, 90, 145);
    border-color: rgb(33, 90, 145);
    width: 100%; /* Ensure button takes full width */
    max-width: 100px; /* Set max-width as needed */
    margin-top: 20px; /* Adjust top margin */
    &:hover {
      background-color: rgb(28, 76, 123);
      border-color: rgb(28, 76, 123);
    }
  }
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
  width: 100%; /* Ensure form groups take full width */
  max-width: 400px; /* Set max-width as needed */
`;

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset the form after submission (optional)
    setEmail("");
    setPassword("");
  };

  return (
    <CenteredContainer>
      <StyledForm onSubmit={handleSubmit}>
        <LogoContainer>
          <Logo
            src="https://i.ibb.co/v30tzD8/pngaaa-com-4457319.png"
            alt="Logo"
          />
        </LogoContainer>
        <Title>Create an Account</Title>

        <StyledFormGroup controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <Email />
            </InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </StyledFormGroup>

        <StyledFormGroup controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <Lock />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </StyledFormGroup>

        <CustomButton type="submit">Submit</CustomButton>
      </StyledForm>
    </CenteredContainer>
  );
};

export default RegistrationForm;

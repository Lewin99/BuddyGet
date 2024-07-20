import React, { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

// Custom styled components
const CenteredContainer = styled(Container)`
  height: 100vh;
  min-width: 100%;
  background: #181a1e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
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
    max-width: 200px; /* Set max-width as needed */
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

const LoginForm: React.FC = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const { Access_token, expiresIn, bankAccountConnected } = responseData;
        const authData = {
          accessToken: Access_token,
          expiresIn,
        };

        setAuth(authData);
        window.localStorage.setItem("auth", JSON.stringify(authData));

        if (bankAccountConnected) {
          navigate("/dashboard");
        } else {
          navigate("/connectToAccount");
        }

        setEmail("");
        setPassword("");
      } else {
        console.log("Login failed:", responseData.error);
        setLoginError(responseData.error);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <CenteredContainer>
      <StyledForm>
        <LogoContainer>
          <Logo
            src="https://i.ibb.co/v30tzD8/pngaaa-com-4457319.png"
            alt="Logo"
          />
        </LogoContainer>
        <Title>Login Form</Title>

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

        <CustomButton type="submit" onClick={handleSubmit}>
          Login
        </CustomButton>
        <div className="pt-2 ">
          <Link to="register" className="nav-link text-secondary mt-2">
            New here?Click to signup.
          </Link>
        </div>
      </StyledForm>
    </CenteredContainer>
  );
};

export default LoginForm;

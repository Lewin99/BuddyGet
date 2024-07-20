import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/contexts/ThemeContext.tsx";
import { AuthProvider } from "./components/contexts/AuthProvider.tsx";
import "./index.css";
import BankLinkComponent from "./components/BankLink_comp/BankLink.tsx";
import RegistrationForm from "./components/Registration_comp/Registration.tsx";
import LoginForm from "./components/Login_comp/login.tsx";
import BudgetComponent from "./components/Budget_comp/Budget.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

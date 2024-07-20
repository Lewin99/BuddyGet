import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "./components/contexts/ThemeContext";
import Sidebar from "./components/Sidebar_comp/sidebar";
import Header from "./components/Header_comp/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./components/Dash_main_comp/DashboardMain";
import LoginForm from "./components/Login_comp/login";
import RegistrationForm from "./components/Registration_comp/Registration";
import BudgetComponent from "./components/Budget_comp/Budget";
import BankLinkComponent from "./components/BankLink_comp/BankLink";
import TransactionsComponent from "./components/Transaction_comp/Transactions";
import BudgetDetailsComponent from "./components/BudgetDetails_comp/BudgetDetailsComponent";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GoalsListComponent from "./components/GoalList_comp/GoalsListComponent";

// Define the prop type
interface StyledSidebarProps {
  isSidebarOpen: boolean;
  theme: {
    textcolor: string;
    background: string;
  };
}

// Styled components
const Layout = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div<StyledSidebarProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isSidebarOpen ? "18%" : "0")};
  min-height: 100vh;
  border-right: ${(props) =>
    props.isSidebarOpen ? "2px solid rgba(132, 139, 200, 0.18)" : "none"};
  transition: width 0.3s;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textcolor};

  @media (max-width: 768px) {
    width: ${(props) => (props.isSidebarOpen ? "60%" : "0")};
    display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
    position: fixed;
    z-index: 1000;
    background-color: ${(props) => props.theme.background};
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 0.3rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textcolor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }
`;

const HamburgerMenu = styled(MenuIcon)`
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseMenu = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

function App() {
  const { mode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Dummy authentication state
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (mode === "light") {
      body.style.backgroundColor = "#f6f6f9";
      body.style.color = "#46484a";
    } else {
      body.style.backgroundColor = "#181a1e";
      body.style.color = "#7d8da1";
    }
  }, [mode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/connectToAccount" element={<BankLinkComponent />} />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout>
                <SidebarWrapper
                  isSidebarOpen={isSidebarOpen}
                  theme={{
                    textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
                    background: mode === "dark" ? "#181a1e" : "#f6f6f9",
                  }}
                >
                  <Sidebar />
                  {isSidebarOpen && window.innerWidth <= 768 && (
                    <CloseMenu onClick={toggleSidebar} />
                  )}
                </SidebarWrapper>
                <MainContent>
                  <HeaderWrapper
                    theme={{
                      textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
                      background: mode === "dark" ? "#181a1e" : "#f6f6f9",
                    }}
                  >
                    {(!isSidebarOpen || window.innerWidth <= 768) && (
                      <LogoWrapper>
                        <img
                          src="https://i.ibb.co/v30tzD8/pngaaa-com-4457319.png"
                          alt="Logo"
                        />
                        {!isSidebarOpen && (
                          <HamburgerMenu onClick={toggleSidebar} />
                        )}
                      </LogoWrapper>
                    )}
                    <Header />
                  </HeaderWrapper>
                  <Routes>
                    <Route path="/Dashboard" element={<Main />} />
                    <Route path="/budget" element={<BudgetComponent />} />
                    <Route
                      path="/budget/:id"
                      element={<BudgetDetailsComponent />}
                    />
                    <Route
                      path="/GoalsListComponent"
                      element={<GoalsListComponent />}
                    />
                    <Route
                      path="/Transactions"
                      element={<TransactionsComponent />}
                    />
                    {/* Define other routes here */}
                  </Routes>
                </MainContent>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

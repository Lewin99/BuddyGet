import React, { useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../Sidebar_comp/sidebar";
import Header from "../Header_comp/Header";

// Define styled components for layout
const Layout = styled.div`
  background-color: blue;
  display: flex;
`;

const StyledSidebar = styled.div`
  width: 20%; // Set sidebar width to 30%
  min-height: 100vh; // Full height
  border-right: 2px solid rgba(132, 139, 200, 0.18);
`;

const MainContent = styled.div`
  background-color: red;
  width: 80%; // Set main content area width to 80%
`;

function Dash() {
  const { mode } = useTheme();

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

  return (
    <Layout>
      <StyledSidebar>
        <Sidebar />
      </StyledSidebar>
      <MainContent>
        <Header />
      </MainContent>
    </Layout>
  );
}

export default Dash;

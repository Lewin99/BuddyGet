import React from "react";
import Sidebar from "../Sidebar_comp/sidebar";
import Header from "../Header_comp/Header";
import Main from "../Dash_main_comp/DashboardMain";
import {
  DashboardWrapper,
  SidebarWrapper,
  DashboardMain,
  HeaderWrapper,
  DashboardBody,
} from "./dashboardStyles";

const Dashboard: React.FC = () => {
  return (
    <DashboardWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <DashboardMain>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <DashboardBody>
          <Main />
        </DashboardBody>
      </DashboardMain>
    </DashboardWrapper>
  );
};

export default Dashboard;

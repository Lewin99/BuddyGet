import React from "react";
import {
  StyledSidebarWrapper,
  StyledLogoWrapper,
  StyledLogoImage,
  StyledLogoText,
  StyledLinksWrapper,
  StyledLinkItem,
  StyledLinkLogoutItem,
  StyledLinkTitle,
} from "./sidebarStyles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "../contexts/ThemeContext";

const Sidebar: React.FC = () => {
  const { mode } = useTheme();
  return (
    <StyledSidebarWrapper
      theme={{
        textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
        background: mode === "dark" ? "#181a1e" : "#f6f6f9",
      }}
    >
      <StyledLogoWrapper>
        <StyledLogoImage
          src="https://i.ibb.co/v30tzD8/pngaaa-com-4457319.png"
          alt="Logo"
        />
        <StyledLogoText>My App</StyledLogoText>
      </StyledLogoWrapper>
      <StyledLinksWrapper>
        <StyledLinkItem>
          <DashboardIcon />
          <StyledLinkTitle>Dashboard</StyledLinkTitle>
        </StyledLinkItem>
        <StyledLinkItem>
          <MonetizationOnOutlinedIcon />
          <StyledLinkTitle>Budget</StyledLinkTitle>
        </StyledLinkItem>
        <StyledLinkItem>
          <ShoppingCartOutlinedIcon />
          <StyledLinkTitle>Transactions</StyledLinkTitle>
        </StyledLinkItem>
        <StyledLinkItem>
          <TimelineOutlinedIcon />
          <StyledLinkTitle>Financial Goals</StyledLinkTitle>
        </StyledLinkItem>
        <StyledLinkItem>
          <ReceiptOutlinedIcon />
          <StyledLinkTitle>Bills Management</StyledLinkTitle>
        </StyledLinkItem>
        <StyledLinkItem>
          <NotificationsIcon />
          <StyledLinkTitle>Notifications</StyledLinkTitle>
        </StyledLinkItem>
        <StyledLinkItem>
          <SettingsIcon />
          <StyledLinkTitle>Settings</StyledLinkTitle>
        </StyledLinkItem>
        <StyledLinkLogoutItem>
          <LogoutIcon />
          <StyledLinkTitle>Logout</StyledLinkTitle>
        </StyledLinkLogoutItem>
      </StyledLinksWrapper>
    </StyledSidebarWrapper>
  );
};

export default Sidebar;

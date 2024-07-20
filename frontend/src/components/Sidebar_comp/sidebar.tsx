import {
  StyledSidebarWrapper,
  StyledLogoWrapper,
  StyledLogoImage,
  StyledLogoText,
  StyledLinksWrapper,
  StyledLinkItem,
  StyledLinkLogoutItem,
  StyledLink,
} from "./sidebarStyles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "../contexts/ThemeContext";

const Sidebar = () => {
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
          <StyledLink to="/dashboard">
            <DashboardIcon />
            Dashboard
          </StyledLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledLink to="/budget">
            <MonetizationOnOutlinedIcon />
            Budget
          </StyledLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledLink to="/Transactions">
            <ShoppingCartOutlinedIcon />
            Transactions
          </StyledLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledLink to="/GoalsListComponent">
            <TimelineOutlinedIcon />
            Financial Goals
          </StyledLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledLink to="/bills">
            <AccountCircleIcon />
            Insights
          </StyledLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledLink to="/notifications">
            <NotificationsIcon />
            Notifications
          </StyledLink>
        </StyledLinkItem>
        <StyledLinkItem>
          <StyledLink to="/settings">
            <SettingsIcon />
            Settings
          </StyledLink>
        </StyledLinkItem>
        <StyledLinkLogoutItem>
          <StyledLink to="/logout">
            <LogoutIcon />
            Logout
          </StyledLink>
        </StyledLinkLogoutItem>
      </StyledLinksWrapper>
    </StyledSidebarWrapper>
  );
};

export default Sidebar;

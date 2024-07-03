import React from "react";
import {
  Profile,
  Info,
  ProfilePhoto,
  ButtonWrapper,
  ToggleButton,
} from "./headerStyles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../contexts/ThemeContext";

const Header: React.FC = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <Profile>
      <ButtonWrapper>
        <ToggleButton
          active={mode === "light"}
          onClick={mode !== "light" ? toggleMode : undefined}
        >
          <LightModeIcon />
        </ToggleButton>
        <ToggleButton
          active={mode === "dark"}
          onClick={mode !== "dark" ? toggleMode : undefined}
        >
          <DarkModeIcon />
        </ToggleButton>
      </ButtonWrapper>
      <Info>
        <p>
          hey,<b>Daniel</b>
        </p>
      </Info>
      <ProfilePhoto>
        <img src="https://i.ibb.co/nmH3KPs/prof1.jpg" alt="prof1" />
      </ProfilePhoto>
    </Profile>
  );
};

export default Header;

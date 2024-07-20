import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledSidebarWrapper = styled.div`
  width: 17%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textcolor};
  font-weight: medium;
`;

export const StyledLogoWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const StyledLogoImage = styled.img`
  width: 5rem;
`;

export const StyledLogoText = styled.h4`
  font-size: large;
  padding-top: 1rem;
  font-style: italic;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const StyledLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

export const StyledLinkItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-left: 20px;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f2; // subtle background on hover for better UX
  }
`;

export const StyledLinkLogoutItem = styled(StyledLinkItem)`
  position: absolute;
  bottom: 2rem;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  text-decoration: none; // Removes underline
  color: inherit; // Inherits color from StyledLinkItem
  display: flex;
  align-items: center;
  width: 100%;

  &:hover {
    text-decoration: none; // Ensure no underline on hover
    color: #5c5c8a; // Adjust the hover color
  }
`;

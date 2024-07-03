import styled from "styled-components";

export const StyledSidebarWrapper = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
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
    margin-left: 0.8rem;
  }

  transition: margin-left 0.5s ease;
`;

export const StyledLinkLogoutItem = styled(StyledLinkItem)`
  position: absolute;
  bottom: 2rem;
  width: 100%;
`;

export const StyledLinkTitle = styled.span`
  margin-left: 10px;
`;

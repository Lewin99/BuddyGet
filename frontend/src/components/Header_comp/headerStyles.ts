import styled from "styled-components";

interface ToggleButtonProps {
  active: boolean;
}

export const ButtonWrapper = styled.div`
  margin-right: 40px;
  border-radius: 5px;
  background-color: #7d8da1;
  display: flex;
  gap: 5px;
`;

export const ToggleButton = styled.button<ToggleButtonProps>`
  background-color: ${({ active }) => (active ? "#7380ec" : "transparent")};
  border: none;
  color: ${({ active }) => (active ? "#fff" : "#000")};
  padding: 4px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#606fc8" : "#f0f0f0")};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 3px solid rgba(132, 139, 200, 0.18);
`;

export const Info = styled.div`
  margin-right: 10px;
  color: ${(props) => props.theme.color};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.8rem;
`;

export const ProfilePhoto = styled.div`
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

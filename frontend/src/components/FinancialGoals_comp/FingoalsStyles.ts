import styled from "styled-components";

export const GoalsWrapper = styled.div`
  width: 97%;
  margin-top: 30px;
  margin-left: 10px;
  height: 80%;
  overflow-y: auto;
  scrollbar-color: ${(props) => props.theme.background} transparent; // Thumb and track colors for Firefox
  &::-webkit-scrollbar {
    width: 8px; // Width of the scrollbar
  }
  &::-webkit-scrollbar-track {
    background: transparent; // Track color
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.background}; // Thumb color
    border-radius: 4px; // Optional: Round the corners of the thumb
    border: 3px solid transparent; // Optional: Adds a border around the thumb
  }
`;

export const GoalTitle = styled.div`
  margin-left: 10px;
`;

export const ProgressBar = styled.div`
  margin-left: 15px;
  margin-bottom: 5px;
`;

export const ProgressBarParent = styled.div`
  width: 90%;
  height: 1vh;
  background-color: rgb(195, 217, 237);
  border-radius: 10px;
`;

export const ProgressBarChild = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #4c83b7;
  border-radius: 10px;
  width: ${({ progress }) => `${progress}%`};
`;

export const GoalCard = styled.div`
  width: 90%;
  margin-bottom: 10px;
  margin-left: 10px;
  border: 2px solid rgba(132, 139, 200, 0.18);
  border-radius: 5px;
`;

export const GoalH6 = styled.h6`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 10px;
  font-size: 0.7rem;
`;

export const GoalSmall = styled.small`
  font-size: 0.6em;
  color: grey;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const GoalCardH6 = styled.h6`
  font-size: 0.7em;
  color: ${(props) => props.theme.color};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const ProgressBarSmall = styled.small`
  font-size: 0.7em;
  font-weight: 900;
  color: ${(props) => props.theme.color};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

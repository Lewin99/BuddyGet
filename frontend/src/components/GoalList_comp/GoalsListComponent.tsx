import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
  Button as BootstrapButton,
} from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useAuth from "../Hooks/useAuth";
import styled from "styled-components";

interface Goal {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
}

const StyledContainer = styled(Container)`
  padding: 20px;
  margin-top: 20px;
`;

const Title = styled.h1`
  padding-bottom: 20px;
`;

const GoalCard = styled(Card)`
  margin-bottom: 20px;
  position: relative;
`;

const AddGoalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const CustomButton = styled(BootstrapButton)`
  background-color: #124275;
  color: #fff;
  border: none;
  &:hover {
    background-color: #18416d;
  }
`;

const CustomButtonDanger = styled(BootstrapButton)`
  background-color: #b01111;
  color: #fff;
  border: none;
  &:hover {
    background-color: #7d0e0e;
  }
`;

const CircularProgressContainer = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const GoalsListComponent: React.FC = () => {
  const { auth } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddAmountModal, setShowAddAmountModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [amountToAdd, setAmountToAdd] = useState<number>(0);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    description: "",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://localhost:5000/Goals/GetGoals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setGoals(data.goals || []);
        } else {
          console.error("Failed to fetch goals:", data.error);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [auth.accessToken]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSaveGoal = async () => {
    try {
      const response = await fetch("http://localhost:5000/Goals/CreateGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(newGoal),
      });

      const data = await response.json();
      if (response.ok && data.goal) {
        setGoals([...goals, data.goal]);
        setNewGoal({
          name: "",
          targetAmount: 0,
          currentAmount: 0,
          description: "",
        });
        handleCloseModal();
      } else {
        console.error("Failed to create goal:", data.error);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const handleAddAmountClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowAddAmountModal(true);
  };

  const handleCloseAddAmountModal = () => {
    setSelectedGoal(null);
    setShowAddAmountModal(false);
    setError("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToAdd(Number(e.target.value));
  };

  const handleAddAmount = async () => {
    if (!selectedGoal) return;

    if (selectedGoal.currentAmount + amountToAdd > selectedGoal.targetAmount) {
      setError("Adding this amount would exceed the target amount.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/Goals/UpdateGoal/${selectedGoal._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify({ amount: amountToAdd }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setGoals(
          goals.map((goal) =>
            goal._id === selectedGoal._id ? { ...goal, ...data } : goal
          )
        );
        handleCloseAddAmountModal();
      } else {
        console.error("Failed to add amount:", data.error);
      }
    } catch (error) {
      console.error("Error adding amount:", error);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/Goals/DeleteGoal/${goalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      if (response.ok) {
        setGoals(goals.filter((goal) => goal._id !== goalId));
      } else {
        const data = await response.json();
        console.error("Failed to delete goal:", data.error);
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <StyledContainer>
      <Title>Financial Goals</Title>
      <AddGoalButtonContainer>
        <CustomButton variant="primary" onClick={handleShowModal}>
          Add Goal
        </CustomButton>
      </AddGoalButtonContainer>
      <Row>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <Col md={4} key={goal._id}>
              <GoalCard>
                <Card.Body>
                  <Card.Title>{goal.name}</Card.Title>
                  <Card.Text>{goal.description}</Card.Text>
                  <Card.Text>
                    <strong>Target Amount:</strong> {goal.targetAmount}
                  </Card.Text>
                  <Card.Text>
                    <strong>Current Amount:</strong> {goal.currentAmount}
                  </Card.Text>
                  <CircularProgressContainer>
                    <CircularProgressbar
                      value={(goal.currentAmount / goal.targetAmount) * 100}
                      text={`${Math.round(
                        (goal.currentAmount / goal.targetAmount) * 100
                      )}%`}
                      styles={buildStyles({
                        pathColor: "#124275",
                        textColor: "#124275",
                      })}
                    />
                  </CircularProgressContainer>
                  <CustomButton
                    variant="warning"
                    size="sm"
                    className="mt-3"
                    onClick={() => handleAddAmountClick(goal)}
                  >
                    Add Amount
                  </CustomButton>{" "}
                  <CustomButtonDanger
                    variant="danger"
                    size="sm"
                    className="mt-3"
                    onClick={() => handleDeleteGoal(goal._id)}
                  >
                    Delete
                  </CustomButtonDanger>
                </Card.Body>
              </GoalCard>
            </Col>
          ))
        ) : (
          <p>No goals found.</p>
        )}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Financial Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newGoal.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Target Amount</Form.Label>
              <Form.Control
                type="number"
                name="targetAmount"
                value={newGoal.targetAmount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Current Amount</Form.Label>
              <Form.Control
                type="number"
                name="currentAmount"
                value={newGoal.currentAmount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newGoal.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <CustomButton variant="primary" onClick={handleSaveGoal}>
              Save
            </CustomButton>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showAddAmountModal} onHide={handleCloseAddAmountModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Amount to {selectedGoal?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amountToAdd}
                onChange={handleAmountChange}
              />
            </Form.Group>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <CustomButton variant="primary" onClick={handleAddAmount}>
              Add Amount
            </CustomButton>
          </Form>
        </Modal.Body>
      </Modal>
    </StyledContainer>
  );
};

export default GoalsListComponent;

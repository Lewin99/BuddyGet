import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  Container,
  InputGroup,
} from "react-bootstrap";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const StyledContainer = styled(Container)`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Title = styled.h1`
  padding-bottom: 20px;
`;

const Section = styled.section`
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CustomForm = styled(Form)`
  margin-bottom: 20px;
`;

const CustomButton = styled(Button)`
  background-color: #007bff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const ItemList = styled(ListGroup)`
  margin-top: 20px;
`;

const StyledPieChart = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const StyledPieChartSection = styled.div`
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BudgetComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [budgets, setBudgets] = useState<any[]>([
    {
      name: "Vacation",
      startDate: "2022-07-01",
      endDate: "2022-07-14",
      total: 1200,
    },
    {
      name: "Home Renovation",
      startDate: "2022-08-01",
      endDate: "2022-09-01",
      total: 4500,
    },
    {
      name: "Christmas Shopping",
      startDate: "2022-12-01",
      endDate: "2022-12-25",
      total: 800,
    },
  ]);
  const [budgetName, setBudgetName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [items, setItems] = useState([{ name: "", amount: "" }]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCreateBudget = () => {
    if (
      !budgetName ||
      !startDate ||
      !endDate ||
      items.some((item) => !item.name || !item.amount)
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const newBudget = {
      name: budgetName,
      startDate,
      endDate,
      items,
    };
    setBudgets([...budgets, newBudget]);
    setBudgetName("");
    setStartDate("");
    setEndDate("");
    setItems([{ name: "", amount: "" }]);
    handleClose();
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", amount: "" }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const pieData = {
    labels: budgets.map((budget) => budget.name),
    datasets: [
      {
        data: budgets.map((budget) => budget.total),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <StyledContainer>
      <Row>
        <Col md={6}>
          <Title>Budget</Title>
          <CustomButton onClick={handleShow}>Create Budget</CustomButton>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomForm>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Budget Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={budgetName}
                  required
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Start Date
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="date"
                  value={startDate}
                  required
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                End Date
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="date"
                  value={endDate}
                  required
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
            </Form.Group>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Item Name
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      value={item.name}
                      required
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                  </Col>
                  <Col sm="1">
                    <CustomButton
                      variant="danger"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </CustomButton>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3">
                    Item Amount
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="number"
                      value={item.amount}
                      required
                      onChange={(e) =>
                        handleItemChange(index, "amount", e.target.value)
                      }
                    />
                  </Col>
                </Form.Group>
              </React.Fragment>
            ))}
            <Form.Group as={Row}>
              <Col sm={{ span: 9, offset: 3 }}>
                <CustomButton onClick={addItem}>Add Item</CustomButton>
              </Col>
            </Form.Group>
            <CustomButton onClick={handleCreateBudget}>
              Create Budget
            </CustomButton>
          </CustomForm>
        </Modal.Body>
      </Modal>

      <Section>
        <Row className="justify-content-between align-items-center">
          <Col md="auto">
            <h4>Created Budgets</h4>
          </Col>
          <Col md="auto">
            <InputGroup>
              <InputGroup.Text>Date Filter:</InputGroup.Text>
              <Form.Control type="date" />
            </InputGroup>
          </Col>
        </Row>
        <ItemList>
          {budgets.map((budget, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {budget.name}
              <CustomButton variant="link">View</CustomButton>
            </ListGroup.Item>
          ))}
        </ItemList>
      </Section>

      <Section>
        <h4>Budget Spending for Last 4 Months</h4>
        <StyledPieChartSection>
          <StyledPieChart>
            <Pie data={pieData} />
          </StyledPieChart>
        </StyledPieChartSection>
      </Section>
    </StyledContainer>
  );
};

export default BudgetComponent;

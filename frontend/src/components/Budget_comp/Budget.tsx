import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Container,
  InputGroup as BootstrapInputGroup,
  Table,
} from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";
import useAuth from "../Hooks/useAuth";
import styled from "styled-components";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)`
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

const CustomButton = styled.button`
  background-color: #124275;
  color: aliceblue;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #18416d;
  }
`;

const CustomInputGroup = styled(BootstrapInputGroup)`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textcolor};

  & > .input-group-text {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textcolor};
  }

  & > .form-control {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textcolor};
  }
`;

const VisualizationContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 400px;
  max-width: 100%;
  text-align: center;
  height: 400px;
`;

const VisualizationTitle = styled.h3`
  margin-bottom: 20px;
`;

const VisualizationRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const EqualSizeChart = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
`;

const SmallerPieChart = styled.div`
  width: 50%;
  height: 50%;
  margin: 0 auto;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textcolor};
  text-align: center;

  &::placeholder {
    color: #6c757d;
  }
`;

interface Item {
  name: string;
  allocatedAmount: number;
}

interface Budget {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  items: Item[];
  actualSpending: number;
}

const BudgetComponent: React.FC = () => {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetName, setBudgetName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([{ name: "", amount: "" }]);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);

  const navigate = useNavigate();

  const handleViewClick = (id: string) => {
    navigate(`/budget/${id}`);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCreateBudget = async () => {
    if (
      !budgetName ||
      !startDate ||
      !endDate ||
      !description ||
      items.some((item) => !item.name || !item.amount)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newBudget = {
      name: budgetName,
      startDate,
      endDate,
      description,
      items: items.map((item) => ({
        name: item.name,
        allocatedAmount: Number(item.amount),
      })),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/Budget/CreateBudget",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify(newBudget),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setBudgets([...budgets, responseData.budget]);
        setBudgetName("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setItems([{ name: "", amount: "" }]);
        handleClose();
      } else {
        alert(`Error: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Failed to save budget:", error);
      alert("Failed to save budget. Please try again later.");
    }
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
    if (items[items.length - 1].name && items[items.length - 1].amount) {
      setItems([...items, { name: "", amount: "" }]);
    } else {
      alert("Please fill in the current item before adding a new one.");
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const { mode } = useTheme();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/Budget/GetBudgets",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setBudgets(data.budgets);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [auth.accessToken]);

  // Prepare data for the charts
  const budgetNames = budgets.map((budget) => budget.name);
  const allocatedAmounts = budgets.map((budget) =>
    budget.items.reduce(
      (total: number, item: Item) => total + item.allocatedAmount,
      0
    )
  );
  const actualSpendings = budgets.map((budget) => budget.actualSpending);

  const pieChartData = {
    labels: budgetNames,
    datasets: [
      {
        label: "Allocated Amount",
        data: allocatedAmounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: budgetNames,
    datasets: [
      {
        label: "Allocated Amount",
        data: allocatedAmounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual Spending",
        data: actualSpendings,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const filteredBudgets = selectedMonth
    ? budgets.filter((budget) => {
        const budgetMonth = new Date(budget.startDate).getMonth();
        const selectedMonthNumber = selectedMonth.getMonth();
        return budgetMonth === selectedMonthNumber;
      })
    : budgets;

  return (
    <StyledContainer
      theme={{
        textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
        background: mode === "dark" ? "#181a1e" : "#f6f6f9",
      }}
    >
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
                  placeholder="Enter budget name"
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
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Description
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Enter budget description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
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
                      placeholder="Enter item name"
                      value={item.name}
                      required
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                  </Col>
                  <Col sm="1">
                    <CustomButton onClick={() => removeItem(index)}>
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
                      placeholder="Enter item amount"
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
        <VisualizationRow>
          <VisualizationContainer>
            <VisualizationTitle>Budget Allocation</VisualizationTitle>
            <SmallerPieChart>
              <Pie data={pieChartData} />
            </SmallerPieChart>
          </VisualizationContainer>
          <VisualizationContainer>
            <VisualizationTitle>Monthly Spending Overview</VisualizationTitle>
            <EqualSizeChart>
              <Bar data={barChartData} options={options} />
            </EqualSizeChart>
          </VisualizationContainer>
        </VisualizationRow>
        <Row className="justify-content-between align-items-center">
          <Col md="auto">
            <h4>Created Budgets</h4>
          </Col>
          <Col md="auto">
            <CustomInputGroup
              theme={{
                textcolor: mode === "dark" ? "#7d8da1" : "#46484a",
                background: mode === "dark" ? "#181a1e" : "#f6f6f9",
              }}
            >
              <BootstrapInputGroup.Text>Month Filter:</BootstrapInputGroup.Text>
              <StyledDatePicker
                selected={selectedMonth}
                onChange={(date: Date) => setSelectedMonth(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Select Month"
              />
            </CustomInputGroup>
          </Col>
        </Row>
        <Table responsive>
          <thead>
            <tr>
              <th>Budget Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Amount</th>
              <th>Actual Spending</th>
              <th>Remaining Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredBudgets.map((budget, index) => {
              const totalAllocatedAmount = budget.items.reduce(
                (total: number, item: Item) => total + item.allocatedAmount,
                0
              );
              const remainingAmount =
                totalAllocatedAmount - budget.actualSpending;

              return (
                <tr key={index}>
                  <td>{budget.name}</td>
                  <td>{new Date(budget.startDate).toLocaleDateString()}</td>
                  <td>{new Date(budget.endDate).toLocaleDateString()}</td>
                  <td>{totalAllocatedAmount}</td>
                  <td>{budget.actualSpending}</td>
                  <td>{remainingAmount}</td>
                  <td>
                    <CustomButton onClick={() => handleViewClick(budget._id)}>
                      View
                    </CustomButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Section>
    </StyledContainer>
  );
};

export default BudgetComponent;

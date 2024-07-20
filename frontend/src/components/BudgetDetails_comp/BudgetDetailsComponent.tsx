import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../Hooks/useAuth";

const BudgetDetailsContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 800px;
  margin: 20px auto; /* Center the container */
  position: relative;
`;

const TopButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const CustomButton = styled.button`
  background-color: #124275;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #18416d;
  }
  margin-top: 10px;
`;

const CustomButtonDanger = styled.button`
  background-color: #b01111;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7d0e0e;
  }
  margin-top: 10px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Label = styled.label`
  flex: 1;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

const Textarea = styled.textarea`
  flex: 2;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ItemLabel = styled(Label)`
  margin-right: 10px;
`;

const ItemInput = styled(Input)`
  margin-right: 10px;
`;

const UpdateSpendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const UpdateSpendingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const UpdateLabel = styled.label`
  font-weight: bold;
  font-size: medium;
`;

const UpdateInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  max-width: 150px; /* Keep it small */
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9em;
`;

interface Item {
  name: string;
  allocatedAmount: number;
}

interface Budget {
  _id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  items: Item[];
  actualSpending: number;
}

const BudgetDetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Budget | null>(null);
  const [spentAmount, setSpentAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/Budget/GetBudget/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch budget");
        }
        setBudget(data.budget);
        setFormData(data.budget);
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    fetchBudget();
  }, [auth.accessToken, id]);

  const handleBackClick = () => {
    navigate("/budget");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditClick = () => {
    setIsEditing(false);
    setFormData(budget); // Reset form data
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    if (formData) {
      const newItems = formData.items.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      setFormData({ ...formData, items: newItems });
    }
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (
      formData &&
      formData.items.every((item) => item.name && item.allocatedAmount > 0)
    ) {
      setFormData({
        ...formData,
        items: [...formData.items, { name: "", allocatedAmount: 0 }],
      });
      setError("");
    } else {
      setError(
        "Please fill in all item names and ensure allocated amounts are greater than zero."
      );
    }
  };

  const removeItem = (index: number) => {
    if (formData) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (
      formData &&
      formData.items.every((item) => item.name && item.allocatedAmount > 0)
    ) {
      try {
        const response = await fetch(
          `http://localhost:5000/Budget/UpdateBudget/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to update budget");
        }
        setBudget(data.budget);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating budget:", error);
      }
    } else {
      setError(
        "Please fill in all item names and ensure allocated amounts are greater than zero."
      );
    }
  };

  const handleCancelBudgetClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/Budget/DeleteBudget/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel budget");
      }
      navigate("/budget");
    } catch (error) {
      console.error("Error cancelling budget:", error);
    }
  };

  const handleUpdateSpending = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(
        `http://localhost:5000/Budget/UpdateActualSpending/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify({ amount: spentAmount }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update actual spending");
      }
      setBudget(data.budget);
      setSpentAmount(0); // Reset the spent amount input
    } catch (error) {
      console.error("Error updating actual spending:", error);
    }
  };

  if (!budget) {
    return <p>Loading...</p>;
  }

  return (
    <BudgetDetailsContainer>
      {isEditing ? (
        <EditForm>
          <FormRow>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData?.name || ""}
              onChange={handleFormChange}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor="startDate">Start Date:</Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={formData?.startDate || ""}
              onChange={handleFormChange}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={formData?.endDate || ""}
              onChange={handleFormChange}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              name="description"
              value={formData?.description || ""}
              onChange={handleFormChange}
            />
          </FormRow>
          <h3>Items:</h3>
          <ItemContainer>
            {formData?.items.map((item, index) => (
              <ItemRow key={index}>
                <ItemLabel>
                  Item Name:
                  <ItemInput
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />
                </ItemLabel>
                <ItemLabel>
                  Allocated Amount:
                  <ItemInput
                    type="number"
                    value={item.allocatedAmount}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "allocatedAmount",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </ItemLabel>
                <CustomButtonDanger onClick={() => removeItem(index)}>
                  Remove
                </CustomButtonDanger>
              </ItemRow>
            ))}
            <CustomButton onClick={addItem}>Add Item</CustomButton>
            {error && <ErrorText>{error}</ErrorText>}
          </ItemContainer>
          <ButtonContainer>
            <CustomButton onClick={handleSaveClick}>Save</CustomButton>
            <CustomButton onClick={handleCancelEditClick}>Cancel</CustomButton>
          </ButtonContainer>
        </EditForm>
      ) : (
        <>
          <TopButtonContainer>
            <CustomButtonDanger onClick={handleCancelBudgetClick}>
              Cancel Budget
            </CustomButtonDanger>
          </TopButtonContainer>
          <h2>{budget.name}</h2>
          <p>Start Date: {new Date(budget.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(budget.endDate).toLocaleDateString()}</p>
          <p>Description: {budget.description}</p>
          <p>
            Total Allocated:{" "}
            {budget.items.reduce(
              (total, item) => total + item.allocatedAmount,
              0
            )}
          </p>
          <p>Actual Spending: {budget.actualSpending}</p>
          <h3>Items:</h3>
          <ItemContainer>
            {budget.items.map((item, index) => (
              <ItemRow key={index}>
                {item.name}: {item.allocatedAmount}
              </ItemRow>
            ))}
          </ItemContainer>
          <ButtonContainer>
            <CustomButton onClick={handleEditClick}>Edit</CustomButton>
          </ButtonContainer>
          <UpdateSpendingContainer>
            <h3>Update Actual Spending</h3>
            <UpdateSpendingRow>
              <UpdateLabel htmlFor="spentAmount">Spent Amount:</UpdateLabel>
              <UpdateInput
                type="number"
                id="spentAmount"
                value={spentAmount}
                onChange={(e) => setSpentAmount(Number(e.target.value))}
                placeholder="Enter spent amount"
              />
            </UpdateSpendingRow>
            <ButtonContainer>
              <CustomButton onClick={handleUpdateSpending}>
                Update Spending
              </CustomButton>
            </ButtonContainer>
          </UpdateSpendingContainer>
        </>
      )}
      <ButtonContainer>
        <CustomButton onClick={handleBackClick}>Back to Budgets</CustomButton>
      </ButtonContainer>
    </BudgetDetailsContainer>
  );
};

export default BudgetDetailsComponent;

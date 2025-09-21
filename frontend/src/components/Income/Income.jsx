import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../api'
import './../../assets/css/Income.css'


const Income = () => {

    const [incomes,setIncomes]=useState([])
    const [source,setSource]=useState('')
    const [amount,setAmount]=useState('')
    const [date, setDate] = useState("");
    const [savingsGoals, setSavingsGoals] = useState([]); 
    const [selectedGoal, setSelectedGoal] = useState('');
    const [allocatedAmount, setAllocatedAmount] = useState('');


  async function fetchSavingsGoals() {
    try {
      const res = await api.get("/api/savings/"); 
      setSavingsGoals(res.data);
    } catch (error) {
      console.error('Failed to fetch savings goals:', error);
    }
  }

    async function addIncome(e) {
  e.preventDefault();

  // Basic form validation
  if (!source || !amount || !date) {
    console.error("Please fill out all required fields.");
    return;
  }

  // Frontend validation for allocated amount before API calls
  if (selectedGoal && allocatedAmount > 0) {
    if (allocatedAmount >amount){
      console.error('Allocated amount is greater than income');
      return;}
    const goalToUpdate = savingsGoals.find(goal => goal.id === parseInt(selectedGoal));
    if (goalToUpdate) {
      const amountNeeded = parseFloat(goalToUpdate.amount) - parseFloat(goalToUpdate.amountSaved);
      const currentAllocation = parseFloat(allocatedAmount);

      if (currentAllocation > amountNeeded) {
        console.error(`The allocated amount ($${currentAllocation.toFixed(2)}) exceeds the remaining goal amount ($${amountNeeded.toFixed(2)}).`);
        return; // Stop execution here if validation fails
      }
    }
  }

  try {
    // 1. Post the new income
    await api.post("/api/income/", {
      source,
      amount,
      date,
      savings_goal: selectedGoal || null,
      allocated_amount: allocatedAmount || 0,
    });

    // 2. Update the savings goal (only if validation passed)
    if (selectedGoal && allocatedAmount > 0) {
      const goalToUpdate = savingsGoals.find(goal => goal.id === parseInt(selectedGoal));
      if (goalToUpdate) {
        const newAmountSaved = parseFloat(goalToUpdate.amountSaved) + parseFloat(allocatedAmount);
        await api.patch(`/api/savings/${selectedGoal}/`, {
          amountSaved: newAmountSaved,
        });
      }
    }
    
    setSource("");
    setAmount("");
    setDate("");
    setSelectedGoal('');
    setAllocatedAmount('');
    fetchIncome();

  } catch (error) {

    console.error("Failed to add income or update savings goal:", error);
  }
}

    async function deleteIncome(id){
        await api.delete(`/api/income/${id}/`);
        fetchIncome();
    }

    async function fetchIncome() {
  try {
    const res = await api.get("/api/income/");
    setIncomes(res.data);
  } catch (error) {
    console.error("Failed to fetch income:", error);
  }
}

    useEffect(() => {
      fetchIncome();
      fetchSavingsGoals(); 
    }, [])

  const total = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
    
  return (
    <div className="income-tracker">
  <h1 className="title">Income Tracker</h1>
  <h3 className="total">Total: ${total.toFixed(2)}</h3>

  <form onSubmit={addIncome} className="income-form">
    <input
      className="form-input"
      placeholder="Source"
      value={source}
      onChange={(e) => setSource(e.target.value)}
    />
    <input
      className="form-input"
      placeholder="Amount"
      type="number"
      step="0.01"
      value={amount}
      onChange={(e) => setAmount(parseFloat(e.target.value) || "")}
    />

    <input
      className="form-input"
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    <select
          className="form-input"
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
        >
          <option value="">Select Savings </option>
          {savingsGoals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.goal}
            </option>
          ))}
        </select>
    
        <input
          className="form-input"
          placeholder="Allocated Amount"
          type="number"
          step="0.01"
          value={allocatedAmount}
          onChange={(e) => setAllocatedAmount(parseFloat(e.target.value) || "")}
        />

    <button type="submit" className="btn-primary">Add</button>
  </form>

      <table className="income-table">
    <thead>
      <tr>
        <th>Source</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Savings Goal(if any)</th>
        <th>Amount Allocated</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {incomes.map((inc) => (
        <tr key={inc.id}>
          <td>{inc.source}</td>
          <td>${inc.amount}</td>
          <td>{inc.date}</td>
          <td>{inc.savings_goal_name}</td>
          <td>{inc.allocated_amount}</td>
          <td>
            <button className="btn-delete" onClick={() => deleteIncome(inc.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  )
}

export default Income

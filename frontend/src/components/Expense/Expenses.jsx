import React from 'react';
import { useEffect, useState } from "react";
// import axios from "axios";
import api from '../../api';
import './../../assets/css/Expenses.css'

const API_URL = "http://127.0.0.1:8000/api/expenses/";
const expenses = () => {

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState("");

  async function fetchExpenses() {
    const res = await api.get("/api/expenses/");
    setExpenses(res.data);
  }

  useEffect(() => { fetchExpenses(); }, []);

  async function addExpense(e) {
    e.preventDefault();
    if (!title || !amount || !date) return;
    await api.post("/api/expenses/", { title, amount, category, date });
    setTitle(""); setAmount(""); setCategory("Other"); setDate("");
    fetchExpenses();
  }

  async function deleteExpense(id) {
    await api.delete(`/api/expenses/${id}/`);
    fetchExpenses();
  }

  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);


  return (
    <div className="expense-tracker">
  <h1 className="title">Expense Tracker</h1>
  <h3 className="total">Total: ${total.toFixed(2)}</h3>

  <form onSubmit={addExpense} className="expense-form">
    <input
      className="form-input"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      className="form-input"
      placeholder="Amount"
      type="number"
      step="0.01"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
      <option>Food</option>
      <option>Transport</option>
      <option>Entertainment</option>
      <option>Bills</option>
      <option>Other</option>
    </select>
    <input
      className="form-input"
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
    <button type="submit" className="btn-primary">Add</button>
  </form>

  <table className="expense-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((exp) => (
        <tr key={exp.id}>
          <td>{exp.title}</td>
          <td>${exp.amount}</td>
          <td>{exp.category}</td>
          <td>{exp.date}</td>
          <td>
            <button className="btn-delete" onClick={() => deleteExpense(exp.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default expenses

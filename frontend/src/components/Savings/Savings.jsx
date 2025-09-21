import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../../api";
import "./../../assets/css/Savings.css";


export default function Savings() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    goal: "",
    amount: "",
    startDate: "",
    endDate: "",
  });
  const [saveAmounts, setSaveAmounts] = useState({}); // track input per goal

  const fetchGoals = async () => {
    try {
      const res = await api.get("/api/savings/");
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/savings/", { ...newGoal, amountSaved: 0 });
      setNewGoal({ goal: "", amount: "", startDate: "", endDate: "" });
      fetchGoals();
    } catch (err) {
      console.error(err.response || err);
    }
  };

  async function deleteSavings(id){
        await api.delete(`/api/savings/${id}/`);
        fetchGoals();
    }

  // Add money to a goal
  const addMoney = async (goalId) => {
    const amountToAdd = parseFloat(saveAmounts[goalId]);
    if (!amountToAdd || amountToAdd <= 0) return;

    const goal = goals.find((g) => g.id === goalId);
    const updatedAmount = parseFloat(goal.amountSaved) + amountToAdd;

    try {
      await api.patch(`/api/savings/${goalId}/`, { amountSaved: updatedAmount });
      setSaveAmounts({ ...saveAmounts, [goalId]: "" });
      fetchGoals();
    } catch (err) {
      console.error(err.response || err);
    }
  };

  return (
    <div className="savings-tracker">
      <h1>Savings Tracker</h1>

      {/* Add New Goal */}
      <form className="savings-form" onSubmit={addGoal}>
        <input
          type="text"
          placeholder="Goal Name"
          value={newGoal.goal}
          onChange={(e) => setNewGoal({ ...newGoal, goal: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={newGoal.amount}
          onChange={(e) =>
            setNewGoal({ ...newGoal, amount: parseFloat(e.target.value) })
          }
          required
        />
        <input
          type="date"
          value={newGoal.startDate}
          onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
        />
        <input
          type="date"
          value={newGoal.endDate}
          onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
        />
        <button type="submit">Add Goal</button>
      </form>

      {/* Display Goals */}
      <div className="goals-list">
        {goals.map((goal) => {
          const saved = parseFloat(goal.amountSaved) || 0;
          const target = parseFloat(goal.amount) || 0;
          const progress = target ? Math.min((saved / target) * 100, 100) : 0;
          const today = new Date();

          return (
            <div key={goal.id} className="goal-card">
              <h3>{goal.goal}</h3>
              <button className="btn-delete" onClick={() => deleteSavings(goal.id)}>
              Delete
            </button>
              <p>
                Saved: ${saved.toFixed(2)} / ${target.toFixed(2)}
              </p>
                {(saved==target)&&<p style={{color:"blue"}}>Goal Accomplished</p>}
                {(saved!=target)&& new Date(goal.endDate)<today &&<p style={{color:"red"}}>Deadline passed </p>}
              
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%`, background: new Date(goal.endDate)<today ? 
                "linear-gradient(90deg, #ff4d4d, #b30000)" 
                : "linear-gradient(90deg, #4caf50, #2e7d32)"}}></div>
              </div>
              <p className="progress-text">{progress.toFixed(1)}%</p>

              {/* Add Money */}
              <div className="add-money">
                <input
                  type="number"
                  placeholder="Add amount"
                  value={saveAmounts[goal.id] || ""}
                  onChange={(e) =>
                    setSaveAmounts({ ...saveAmounts, [goal.id]: e.target.value })
                  }
                />
                <button onClick={() => addMoney(goal.id)}>Save</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
import api from "../../api";
import "./../../assets/css/finance-dashboard.css";
import "./../../assets/css/dashboard-cards.css";
import "./../../assets/css/dashboard-filter.css";
import "./../../assets/css/dashboard-charts.css";

import DateRangeFilter from "./components/DateRangeFilter";
import KPI from "./components/KPI";
import SavingsProgress from "./components/SavingsProgress";

import IncomeVsExpenseBar from "./charts/IncomeVsExpenseBar";
import ExpenseCategoryPie from "./charts/ExpenseCategoryPie";
import IncomeSourcePie from "./charts/IncomeSourcePie";



export default function FinanceDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes]   = useState([]);
  const [savings, setSavings]   = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate]     = useState("");

  // Fetch all data once
  useEffect(() => {
    (async () => {
      try {
        const [expRes, incRes, savRes] = await Promise.all([
          api.get("/api/expenses/"),
          api.get("/api/income/"),
          api.get("/api/savings/"),
        ]);
        setExpenses(expRes.data || []);
        setIncomes(incRes.data || []);
        setSavings(savRes.data || []);
      } catch (e) {
        console.error("Failed to fetch dashboard data:", e);
      }
    })();
  }, []);

  // Helpers
  const inRange = (dateStr) => {
    const d = new Date(dateStr);
    const s = startDate ? new Date(startDate) : null;
    const e = endDate ? new Date(endDate) : null;
    return (!s || d >= s) && (!e || d <= e);
  };

  const filteredExpenses = useMemo(
    () => expenses.filter((x) => inRange(x.date)),
    [expenses, startDate, endDate]
  );
  const filteredIncomes = useMemo(
    () => incomes.filter((x) => inRange(x.date)),
    [incomes, startDate, endDate]
  );

  const totalExpenses = useMemo(
    () => filteredExpenses.reduce((sum, x) => sum + parseFloat(x.amount), 0),
    [filteredExpenses]
  );
  const totalIncome = useMemo(
    () => filteredIncomes.reduce((sum, x) => sum + parseFloat(x.amount), 0),
    [filteredIncomes]
  );
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome ? ((netBalance / totalIncome) * 100).toFixed(1) : "0.0";

  // Grouping
  const groupSum = (arr, key) => {
    const map = new Map();
    arr.forEach((item) => {
      const k = item[key];
      const prev = map.get(k) || 0;
      map.set(k, prev + parseFloat(item.amount));
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  };

  const expenseByCategory = useMemo(
    () => groupSum(filteredExpenses, "category"),
    [filteredExpenses]
  );

  const incomeBySource = useMemo(
    () => groupSum(filteredIncomes, "source"),
    [filteredIncomes]
  );

  const chartCompare = useMemo(
    () => [
      { name: "Income", amount: totalIncome },
      { name: "Expenses", amount: totalExpenses },
    ],
    [totalIncome, totalExpenses]
  );

  // Savings aggregates
  const totalSaved = useMemo(
    () => (savings || []).reduce((s, x) => s + parseFloat(x.amountSaved || 0), 0),
    [savings]
  );
  const totalSavingsGoals = useMemo(
    () => (savings || []).reduce((s, x) => s + parseFloat(x.amount || 0), 0),
    [savings]
  );

  return (
    <div className="fd-wrapper">
      <h1></h1>
      <header className="fd-header">
        <h1>Finance Dashboard</h1>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onChangeStart={setStartDate}
          onChangeEnd={setEndDate}
          onClear={() => { setStartDate(""); setEndDate(""); }}
        />
      </header>

      {/* KPIs */}
      <section className="fd-kpis">
        <KPI title="Total Income" value={totalIncome} variant="income" />
        <KPI title="Total Expenses" value={totalExpenses} variant="expense" />
        <KPI title="Net Balance" value={netBalance} variant={netBalance >= 0 ? "positive" : "negative"} />
        <KPI title="Savings Rate" value={`${savingsRate}%`} variant="neutral" />
      </section>

      {/* Charts Grid */}
      <section className="fd-grid">
        <div className="fd-card">
          <h2>Income vs Expenses</h2>
          <IncomeVsExpenseBar data={chartCompare} />
        </div>

        <div className="fd-card">
          <h2>Expenses by Category</h2>
          <ExpenseCategoryPie data={expenseByCategory} />
        </div>

        <div className="fd-card">
          <h2>Income by Source</h2>
          <IncomeSourcePie data={incomeBySource} />
        </div>

        <div className="fd-card">
          <h2>Savings Goals</h2>
          <SavingsProgress items={savings} />
          <div className="fd-savings-totals">
            <div>Total Saved: <span className="fd-green">${totalSaved.toFixed(2)}</span></div>
            <div>Goal Total: <span>${totalSavingsGoals.toFixed(2)}</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}

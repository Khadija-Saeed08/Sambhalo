import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../assets/css/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    // { path: "/ExpenseDashboard", label: "Expense Dashboard" },
    // { path: "/IncomeDashboard", label: "Income Dashboard" },
    { path: "/", label: "Finance Dashboard" },
    { path: "/income", label: "Manage Income" },
    { path: "/new-expense", label: "Manage Expenses" },
    // { path: "/InsightsDashboard", label: "Insights Dashboard" },
    { path: "/Savings", label: "Savings" },

  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {/* <h2 className="sidebar-title">{!collapsed && "Finance Tracker"}</h2> */}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
          >
            {!collapsed && link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

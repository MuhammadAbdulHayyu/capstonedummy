import React from "react";
import "../styles/Dashboard.css";
import Admin from "../components/AdminDashboard/Admin";
import Sidebar from "../components/AdminDashboard/Sidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <AdminNavbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <Admin />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

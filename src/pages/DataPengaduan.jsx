import React from "react";
import "../styles/Dashboard.css";
import AdminPengaduan from "../components/AdminDashboard/AdminPengaduan";
import Sidebar from "../components/AdminDashboard/Sidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";

function DataPengaduan() {
    return (
      <div className="dashboard-wrapper">
        <AdminNavbar />
        <div className="dashboard-container">
          <Sidebar />
          <div className="main-content">
            <AdminPengaduan />
          </div>
        </div>
      </div>
    );
  }
  
  export default DataPengaduan;

import React from "react";
import "../styles/Dashboard.css";
import AdminFoto from "../components/AdminDashboard/Foto";
import Sidebar from "../components/AdminDashboard/Sidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";

function DataFoto() {
    return (
      <div className="dashboard-wrapper">
        <AdminNavbar />
        <div className="dashboard-container">
          <Sidebar />
          <div className="main-content">
            <AdminFoto />
          </div>
        </div>
      </div>
    );
  }
  
  export default DataFoto;

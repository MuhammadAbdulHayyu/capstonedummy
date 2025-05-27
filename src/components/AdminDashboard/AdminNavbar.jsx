import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // pastikan path sesuai
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = window.confirm("Yakin ingin keluar?");
    if (!confirm) return;
  
    try {
      await signOut(auth);
      navigate("/LoginAdmin", {replace: true});
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <h1 className="admin-navbar-title">DASHBOARD</h1>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

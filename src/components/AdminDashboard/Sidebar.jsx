import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaDatabase, FaExclamationCircle, FaChevronDown } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">SIPH</h2>
      <ul className="sidebar-menu">
        {/* Dashboard */}
        <li>
          <NavLink to="/Dashboard" exact activeClassName="active">
            <FaHome className="icon" />
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/Pelanggaran" exact activeClassName="active">
            <FaDatabase className="icon" />
            Data Pelanggaran
          </NavLink>
        </li>
        <li>
          <NavLink to="/DataPengaduan" activeClassName="active">
            <FaExclamationCircle className="icon" />
            Pengaduan
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

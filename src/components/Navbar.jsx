import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="wrapper">
        <div className="logo"><a href="/">SIPH</a></div>
        <ul className="menu">
          <li><NavLink exact to="/" activeClassName="active">HOME</NavLink></li>
          <li><NavLink to="/DataPelanggaran" activeClassName="active">DATA PELANGGARAN</NavLink></li>
          <li><NavLink to="/Pengaduan" activeClassName="active">PENGADUAN</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

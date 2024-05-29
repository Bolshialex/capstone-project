import React from "react";
import { Link } from "react-router-dom";
import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FaChartPie, FaPeopleArrows } from "react-icons/fa";
import "../App.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaChartPie className="icon_header" /> CRM
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <Link className="sidebar-link" to={"/main"}>
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </Link>
        <Link className="sidebar-link" to={"/employees"}>
          <li className="sidebar-list-item">
            <BsPeopleFill className="icon" /> Employees
          </li>
        </Link>
        <Link className="sidebar-link" to={"/customers"}>
          <li className="sidebar-list-item">
            <FaPeopleArrows className="icon" /> Customers
          </li>
        </Link>
        <li className="sidebar-list-item">
          <a>
            <FaPeopleGroup className="icon" /> Meetings
          </a>
        </li>
        <li className="sidebar-list-item">
          <a>
            <AiOutlineMail className="icon" /> Messages
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

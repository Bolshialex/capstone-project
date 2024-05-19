import React from "react";
import { Link } from "react-router-dom";
import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FaChartPie, FaPeopleArrows } from "react-icons/fa";

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
        <li className="sidebar-list-item">
          <Link to={"/main"}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to={"/employees"}>
            <BsPeopleFill className="icon" /> Employees
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a>
            <FaPeopleArrows className="icon" /> Customers
          </a>
        </li>
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
        <li className="sidebar-list-item">
          <a>
            <IoIosSettings className="icon" /> Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

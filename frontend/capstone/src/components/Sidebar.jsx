import React from "react";
import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";

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
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Employees
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <FaPeopleArrows className="icon" /> Customers
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <FaPeopleGroup className="icon" /> Meetings
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <AiOutlineMail className="icon" /> Messages
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

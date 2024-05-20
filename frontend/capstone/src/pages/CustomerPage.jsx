import CustomerTable from "../components/CustomerTable";
import React from "react";
import Header from "../components/Header";
import "../App.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function CustomerPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <CustomerTable />
    </div>
  );
}

export default CustomerPage;

import React from "react";
import Header from "../components/Header";
import "../App.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Profile from "../components/Profile";

function ProfilePage() {
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
      <Profile />
    </div>
  );
}

export default ProfilePage;

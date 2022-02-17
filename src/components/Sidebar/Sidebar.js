// import { useState } from "react";
import Spacer from '../UI/Spacer'
import SiderbarItem from "./SidebarItem";
import "./Sidebar.css";

function Sidebar(props) {
  const sidebarItems = ["Inbox", "Today", "Upcoming"];

  return (
    <div className="sidebar">
      <div className="sidebar-list">
        {sidebarItems.map((item, index) => {
          return (
            <SiderbarItem key={index} title={item} to={item.toLowerCase()} />
          );
        })}
      </div>
      <Spacer/>
      <SiderbarItem title="Settings" to="settings"></SiderbarItem>
    </div>
  );
}

export default Sidebar;

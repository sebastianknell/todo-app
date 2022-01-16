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
            <SiderbarItem key={index} title={item} index={index} onClick={props.onSelectView} />
          );
        })}
      </div>
      <Spacer/>
      <div className="sidebar-item">Settings</div>
    </div>
  );
}

export default Sidebar;

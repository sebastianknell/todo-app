// import { useState } from "react";
import { useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import Spacer from "../UI/Spacer";
import Tooltip from "../UI/Tooltip";
import SiderbarItem from "./SidebarItem";
import SidebarAreaItem from "./SidebarAreaItem";

import "./Sidebar.css";

function Sidebar(props) {
  const areas = useSelector((state) => state.todo.areas);

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <SiderbarItem bold space to="inbox">
          Inbox
        </SiderbarItem>
        <SiderbarItem bold to="today">
          Today
        </SiderbarItem>
        <SiderbarItem bold to="upcoming">
          Upcoming
        </SiderbarItem>
        <SiderbarItem bold to="anytime">
          Anytime
        </SiderbarItem>
        <SiderbarItem bold space to="someday">
          Someday
        </SiderbarItem>
        <SiderbarItem bold to="logbook">
          Logbook
        </SiderbarItem>
        <SiderbarItem bold to="trash">
          Trash
        </SiderbarItem>
      </ul>
      <ul className="sidebar-list">
        {areas.map((area) => (
          <SidebarAreaItem key={area.id} area={area} />
        ))}
      </ul>
      <Spacer />
      <div className="sidebar-footer">
        <button className="btn">
          <FaPlus />
          <span className="sidebar-button-text">New List</span>
        </button>
        <button className="btn sidebar-preferences">
          <Tooltip title="Preferences" />
          <GoSettings fontSize="18px" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

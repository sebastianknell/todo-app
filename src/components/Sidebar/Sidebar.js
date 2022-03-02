// import { useState } from "react";
import { useSelector } from "react-redux";
import Spacer from "../UI/Spacer";
import SiderbarItem from "./SidebarItem";
import "./Sidebar.css";

function Sidebar(props) {
  const areas = useSelector((state) => state.todo.areas);

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <SiderbarItem bold space title="Inbox" to="inbox" />
        <SiderbarItem bold title="Today" to="today" />
        <SiderbarItem bold title="Upcoming" to="upcoming" />
        <SiderbarItem bold title="Anytime" to="anytime" />
        <SiderbarItem bold space title="Someday" to="someday" />
        <SiderbarItem bold title="Logbook" to="logbook" />
        <SiderbarItem bold title="Trash" to="trash" />
      </ul>
      <ul className="sidebar-list">
        {areas.map((area) => (
          // TODO change to nested route
          <SiderbarItem
            key={area.id}
            title={area.name}
            to={`area-${area.name.toLowerCase()}`}
          />
        ))}
      </ul>
      <Spacer />
      <div className="sidebar-actions">
          New List
      </div>
    </div>
  );
}

export default Sidebar;

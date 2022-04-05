import { useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../hooks/use-click-outside";

import { FaPlus } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import Card from "../UI/Card";
import Spacer from "../UI/Spacer";
import Tooltip from "../UI/Tooltip";
import SiderbarItem from "./SidebarItem";
import SidebarAreaItem from "./SidebarAreaItem";

import "./Sidebar.css";

const NewListMenu = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Card className="new-list-menu">
        <div className="new-list-menu-item">
          <h3>New Project</h3>
          <p>Create a new project</p>
        </div>
        <div className="separator-line"></div>
        <div className="new-list-menu-item">
          <h3>New Area</h3>
          <p>Create a new area</p>
        </div>
      </Card>
    </div>
  );
});

function Sidebar(props) {
  const {
    ref,
    isComponentVisible: showingMenu,
    setIsComponentVisible: setShowingMenu,
  } = useClickOutside(false, document.getElementById("view"));
  const areas = useSelector((state) => state.area.areas);

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
      {showingMenu && <NewListMenu ref={ref} />}
      <div className="sidebar-footer">
        <button
          className="btn"
          onClick={() => setShowingMenu((wasShowingMenu) => !wasShowingMenu)}
        >
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

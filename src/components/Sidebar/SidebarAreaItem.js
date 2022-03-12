import { useState } from "react";
import { FiBox, FiCircle } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import SiderbarItem from "./SidebarItem";

import "./SidebarAreaItem.css";

function SidebarProjectItem({ project }) {
  return (
    <SiderbarItem to={`project-${project.name.toLowerCase()}`}>
      <div className="sidebar-area-item">
        <div className="sidebar-area-item-head">
          <FiCircle />
          <span>{project.name}</span>
        </div>
      </div>
    </SiderbarItem>
  );
}

function SidebarAreaItem({ area }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsExpanded((wasExpanded) => !wasExpanded);
  };
  let arrowClasses = "sidebar-area-item-arrow";
  if (isExpanded) arrowClasses += " rotating-right";
  else arrowClasses += " rotating-left";

  const projects = area.projects.map(project => <SidebarProjectItem key={project.id} project={project}/>)

  return (
    // TODO change to nested route
    <>
      <SiderbarItem bold to={`area-${area.name.toLowerCase()}`}>
        <div className="sidebar-area-item">
          <div className="sidebar-area-item-head">
            <FiBox />
            <span>{area.name}</span>
          </div>
          <IoIosArrowForward
            className={arrowClasses}
            onClick={toggleIsExpanded}
          />
        </div>
      </SiderbarItem>
      {/* TODO fade out animation when closed */}
      {isExpanded && projects}
    </>
  );
}

export default SidebarAreaItem;

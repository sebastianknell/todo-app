import { useState } from "react";
import { useSelector } from "react-redux";
import { FiBox, FiCircle } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import SiderbarItem from "./SidebarItem";

import "./SidebarAreaItem.css";

function SidebarProjectItem({ project }) {
  return (
    <SiderbarItem to={`project/${project.id}`}>
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

  const projects = useSelector((state) =>
    state.area.projects.filter((project) => project.areaId === area.id)
  );
  const projectsItems = projects.map(project => <SidebarProjectItem key={project.id} project={project}/>)

  return (
    <>
      <SiderbarItem bold to={`area/${area.id}`}>
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
      {isExpanded && projectsItems}
    </>
  );
}

export default SidebarAreaItem;

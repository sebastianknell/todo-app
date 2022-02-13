import { NavLink } from "react-router-dom";

import "./SidebarItem.css";

function SiderbarItem(props) {
  return (
    <NavLink className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"} to={props.to}>
      {props.title}
    </NavLink>
  );
}

export default SiderbarItem;

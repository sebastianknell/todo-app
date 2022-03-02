import { NavLink } from "react-router-dom";

import "./SidebarItem.css";

function SiderbarItem(props) {
  let classes = "sidebar-item";
  if (props.space) classes += " space";
  if (props.bold) classes += " bold";
  // console.log(classes)

  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes} active` : `${classes}`
        }
        to={props.to}
      >
        {props.title}
      </NavLink>
    </li>
  );
}

export default SiderbarItem;

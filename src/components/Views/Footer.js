import { useState } from "react";
import { useSelector } from "react-redux";

import {
  FaRegCalendar,
  FaPlus,
  FaLongArrowAltRight,
  FaSearch,
} from "react-icons/fa";

import Card from "../UI/Card";

import "./Footer.css";

// TODO set animation delay
function Tooltip(props) {
  return (
    <Card className="tooltip">
      <div className="tooltip-title">{props.title}</div>
      <div className="tooltip-message">{props.message}</div>
    </Card>
  );
}

function Footer(props) {
  const [showingTooltip, setShowingTooltip] = useState(false);
  const selectedTodo = useSelector((state) => state.ui.selectedTodo);
  const iconClass = selectedTodo === null ? "icon-disabled" : "icon-enabled";

  const showTooltip = () => {
    setShowingTooltip(true);
  };

  const hideTooltip = () => {
    setShowingTooltip(false);
  };

  return (
    <div className="footer">
      <div className="icon-enabled" onClick={props.onNewTodo}>
        <Tooltip title="New To-Do" message="Add a new To-Do" />
        <FaPlus />
      </div>
      <div className={iconClass}>
        <Tooltip title="Set Date" message="Decide when to start. Today or later?" />
        <FaRegCalendar />
      </div>
      <div className={iconClass}>
        <Tooltip title="Move" message="Move to another project" />
        <FaLongArrowAltRight />
      </div>
      <div className="icon-enabled">
        <Tooltip title="Search" message="Search anything you want" />
        <FaSearch />
      </div>
    </div>
  );
}

export default Footer;

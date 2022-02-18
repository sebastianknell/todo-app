import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import { uiActions } from "../../store/ui-slice";

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
  const dispatch = useDispatch();
  const [showingTooltip, setShowingTooltip] = useState(false);
  const selectedTodo = useSelector((state) => state.ui.selectedTodo);
  const iconClass = selectedTodo === null ? "icon-disabled" : "icon-enabled";

  const showTooltip = () => {
    setShowingTooltip(true);
  };

  const hideTooltip = () => {
    setShowingTooltip(false);
  };

  const handleNewTodo = () => {
    const id = 3; // TODO use unique id
    dispatch(
      todoActions.addTodo({
        id: id,
        completed: false,
        location: "Inbox",
      })
    );
    dispatch(uiActions.setOpenedTodo(id));
  };

  return (
    <div className="footer">
      <div className="icon-enabled" onClick={handleNewTodo}>
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

// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addTodo } from "../../store/todo-api";
import { todoActions } from "../../store/todo-slice";
import { uiActions } from "../../store/ui-slice";
import { getTodoFromContext } from "../../utils/todo-utils";

import {
  FaRegCalendar,
  FaPlus,
  FaLongArrowAltRight,
  FaSearch,
} from "react-icons/fa";
import Tooltip from "../UI/Tooltip";

import "./Footer.css";

function Footer(props) {
  const dispatch = useDispatch();
  const selectedTodo = useSelector((state) => state.ui.selectedTodo);
  const context = useLocation();
  const iconClass = selectedTodo === null ? "icon-disabled" : "icon-enabled";

  const handleNewTodo = () => {
    dispatch(addTodo(getTodoFromContext(context.pathname)));
  };

  return (
    <div className="row grow" id="footer">
      <div className="footer">
        <button className="icon-enabled" onClick={handleNewTodo}>
          <Tooltip title="New To-Do" message="Add a new To-Do" />
          <FaPlus />
        </button>
        <button className={iconClass}>
          <Tooltip
            title="Set Date"
            message="Decide when to start. Today or later?"
          />
          <FaRegCalendar />
        </button>
        <button className={iconClass}>
          <Tooltip title="Move" message="Move to another project" />
          <FaLongArrowAltRight />
        </button>
        <button className="icon-enabled">
          <Tooltip title="Search" message="Search anything you want" />
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default Footer;

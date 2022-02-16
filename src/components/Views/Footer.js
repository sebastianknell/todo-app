import { useSelector } from "react-redux";

import { FaRegCalendar, FaPlus, FaLongArrowAltRight } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import "./Footer.css";

function Footer(props) {
  const selectedTodo = useSelector(state => state.ui.selectedTodo);
  const iconClass = selectedTodo === null ? "icon-disabled" : "icon-enabled";

  return (
    <div className="footer">
      <div className="icon-enabled" onClick={props.onNewTodo}>
        <FaPlus display="flex"/>
      </div>
      <div className={iconClass}>
        <FaRegCalendar aria-disabled="true" />
      </div>
      <div className={iconClass}>
        <FaLongArrowAltRight />
      </div>
      <div className={iconClass}>
        <GoThreeBars />
      </div>
    </div>
  );
}

export default Footer;

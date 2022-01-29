import { FaRegCalendar, FaPlus, FaLongArrowAltRight } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import "./Footer.css";

function Footer(props) {
  return (
    <div className="footer">
      <div className="icon-wrapper" onClick={props.onNewTodo}>
        <FaPlus display="flex"/>
      </div>
      <div className="icon-wrapper">
        <FaRegCalendar />
      </div>
      <div className="icon-wrapper">
        <FaLongArrowAltRight />
      </div>
      <div className="icon-wrapper no-border">
        <GoThreeBars />
      </div>
    </div>
  );
}

export default Footer;

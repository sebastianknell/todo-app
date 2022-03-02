import Header from "./Header";
import Spacer from "../UI/Spacer";

import "./View.css";

function View(props) {
  return (
    <div className="wrapper-view">
      <Header title={props.title} />
      {props.children}
    </div>
  );
}

export default View;

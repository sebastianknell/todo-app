import Header from "./Header";
import Spacer from "../UI/Spacer";

import './View.css'

function View(props) {
  return (
    <div className="wrapper-view">
      <div className="view-body">
        <Header title={props.title} />
        {props.children}
      </div>
      <Spacer />
    </div>
  );
}

export default View;

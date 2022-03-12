import Header from "./Header";

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

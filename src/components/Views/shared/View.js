import Header from "./Header";

import "./View.css";

function View({title, children}) {
  return (
    <div className="view-wrapper">
      <Header title={title} />
      <div className="view-body">
        {children}
      </div>
    </div>
  );
}

export default View;

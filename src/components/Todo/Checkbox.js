import './Checkbox.css'

function Checkbox(props) {
  return (
    // TODO use input checkbox instead
    <div
      className={`checkbox no-shrink ${props.completed ? "completed" : ""}`}
      onClick={props.onClick}
    ></div>
  );
}

export default Checkbox;

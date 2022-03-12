import Card from "./Card";
import './Tooltip.css'

function Tooltip(props) {
  return (
    <Card className="tooltip">
      <div className="tooltip-title">{props.title}</div>
      <div className="tooltip-message">{props.message}</div>
    </Card>
  );
}

export default Tooltip;

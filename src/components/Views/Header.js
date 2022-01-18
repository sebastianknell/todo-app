import { FaSearch } from "react-icons/fa";
import Spacer from "../UI/Spacer";

function Header(props) {
  const headerStyle = {
    display: "flex",
    padding: "0.5rem",
    fontSize: "18px",
    fontWeight: "bold",
  };

  return (
    <div style={headerStyle}>
      <Spacer />
      <div>{props.title}</div>
      <Spacer />
      <FaSearch />
    </div>
  );
}

export default Header;

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
      <div>{props.title}</div>
      <Spacer />
    </div>
  );
}

export default Header;

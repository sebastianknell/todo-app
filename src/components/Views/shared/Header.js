function Header({title}) {
  const headerStyle = {
    display: "flex",
    padding: "0.5rem",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2a2d34"
  };

  return (
    <div style={headerStyle}>
      <div>{title}</div>
    </div>
  );
}

export default Header;

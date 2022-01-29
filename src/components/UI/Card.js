function Card(props) {
  const style = {
    borderRadius: "5px",
    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.25)",
  };
  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  );
}

export default Card;

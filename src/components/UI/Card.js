function Card({className, children}) {
  const style = {
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
  };
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

export default Card;

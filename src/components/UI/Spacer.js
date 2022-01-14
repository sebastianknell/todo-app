function Spacer(props) {
  const grow = props.grow ? props.grow : 2;
  return <span style={{flexGrow: grow}} />;
}

export default Spacer;
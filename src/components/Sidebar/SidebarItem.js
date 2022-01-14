import './SidebarItem.css'

function SiderbarItem(props) {
  return (
    <div className="sidebar-item" onClick={() => props.onClick(props.index)}>
      {props.title}
    </div>
  );
}

export default SiderbarItem;

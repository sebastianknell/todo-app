import './HeaderButton.css'

function HeaderButton({title, onClick}) {
  return <button className="header-button" onClick={onClick}>{title}</button>;
}

export default HeaderButton
import { FaSearch } from "react-icons/fa";
import Spacer from "../UI/Spacer";
import Todo from "../Todo/Todo";
import "./InboxView.css";

function InboxView() {
  const todos = [
    {
      id: 1,
      title: "Comprar papa",
      dueDate: new Date("2022-01-16"),
      completed: false,
    },
  ];

  return (
    <div className="inbox-view">
      <div className="header">
        <Spacer />
        <div className="header-title">Inbox</div>
        <Spacer />
        <FaSearch />
      </div>
      <div className="inbox-body">
        <Todo todo={todos[0]} />
        <Todo todo={todos[0]} />
      </div>
    </div>
  );
}

export default InboxView;

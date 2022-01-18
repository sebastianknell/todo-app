import { useState } from "react";
import Header from "./Header"
import Spacer from "../UI/Spacer";
import Todo from "../Todo/Todo";
import "./InboxView.css";

function InboxView(props) {
  const [selected, setSelected] = useState();
  const todos = [
    {
      id: 1,
      title: "Comprar papa",
      dueDate: new Date("2022-01-16"),
      completed: false,
    },
    {
      id: 2,
      title: "Comprar carne",
      dueDate: new Date("2022-01-16"),
      completed: false,
    },
  ];

  const handleClick = (id) => {
    setSelected((prevState) => {
      if (prevState === id) return undefined;
      return id;
    });
  }

  return (
    <div className="inbox-view">
      <Header title="Inbox"/>
      <div className="inbox-body">
        {todos.map(item => <Todo todo={item} onClick={handleClick} highlighted={selected === item.id ? true : false}/>)}
      </div>
    </div>
  );
}

export default InboxView;

import { useMemo } from "react";
import { useSelector } from "react-redux";

import View from "./View";
import Todo from "../Todo/Todo";

import "./InboxView.css";

function InboxView(props) {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () => allTodos.filter((item) => item.location === "inbox"),
    [allTodos]
  );

  return (
    <View title="Inbox">
      {todos.map((item) => (
        <Todo key={item.id} todo={item} />
      ))}
    </View>
  );
}

export default InboxView;

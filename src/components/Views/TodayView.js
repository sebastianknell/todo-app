import { useMemo } from "react";
import { useSelector } from "react-redux";

import View from "./View";
import Todo from "../Todo/Todo";

function TodayView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () => allTodos.filter((item) => item.location === "today"),
    [allTodos]
  );

  return (
    <View title="Today">
      {todos.map((item) => (
        <Todo key={item.id} todo={item} />
      ))}
    </View>
  );
}

export default TodayView;

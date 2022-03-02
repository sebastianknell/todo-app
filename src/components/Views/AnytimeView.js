import { useMemo } from "react";
import { useSelector } from "react-redux";

import View from "./View";
import Todo from "../Todo/Todo";

export default function AnytimeView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () => allTodos.filter((item) => !item.completed && !item.inbox && !item.date),
    [allTodos]
  );

  return (
    <View title="Anytime">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
  );
}


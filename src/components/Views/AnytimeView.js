import { useMemo } from "react";
import { useSelector } from "react-redux";

import View from "./shared/View";
import Todo from "../Todo/Todo";

export default function AnytimeView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () => allTodos.filter((todo) => !todo.logged && !todo.inbox && !todo.date && !todo.trash),
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


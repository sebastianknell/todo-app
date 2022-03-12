import { useMemo } from "react";
import { useSelector } from "react-redux";

import View from "./shared/View";
import Todo from "../Todo/Todo";

export default function SomedayView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () => allTodos.filter((item) => !item.completed && !!item.someday),
    [allTodos]
  );

  return (
    <View title="Someday">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
  );
}

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDate } from "../../utils/date-utils";

import View from "./View";
import Todo from "../Todo/Todo";

function TodayView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () =>
      allTodos.filter(
        (item) =>
          getDate(new Date(item.date)) === getDate(new Date()) &&
          !item.completed
      ),
    [allTodos]
  );

  return (
    <View title="Today">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
  );
}

export default TodayView;

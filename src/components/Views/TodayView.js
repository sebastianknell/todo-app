import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDate } from "../../utils/date-utils";

import View from "./shared/View";
import Todo from "../Todo/Todo";

const today = new Date(
  new Date(new Date().setUTCDate(new Date().getDate())).setUTCHours(0, 0, 0, 0)
);

function TodayView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () =>
      allTodos.filter(
        (item) =>
          getDate(new Date(item.date)) === getDate(today) &&
          !item.logged
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

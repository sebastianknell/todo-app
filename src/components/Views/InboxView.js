import { useMemo } from "react";
import { useSelector } from "react-redux";

import View from "./shared/View";
import Todo from "../Todo/Todo";

function InboxView(props) {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () => allTodos.filter((item) => !!item.inbox && !item.logged && !item.someday),
    [allTodos]
  );

  return (
    <View title="Inbox">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
  );
}

export default InboxView;

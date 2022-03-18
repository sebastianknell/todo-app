import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompletedTodos } from "../../store/todo-api";

import View from "./shared/View";
import Todo from "../Todo/Todo";

let shouldFetch = true;

function LogbookView(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    // Quick fix
    if (shouldFetch) {
      dispatch(fetchCompletedTodos());
      shouldFetch = false;
    }
  }, [dispatch]);

  const allTodos = useSelector((state) => state.todo.todos);
  const completedTodos = useMemo(
    () => allTodos.filter((todo) => todo.completed === true),
    [allTodos]
  );

  return (
    <View title="Logbook">
      {completedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
  );
}

export default LogbookView;

import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompletedTodos, logTodos } from "../../store/todo-api";

import View from "./shared/View";
import HeaderButton from "./shared/HeaderButton";
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
    () => allTodos.filter((todo) => todo.logged === true && !todo.trash),
    [allTodos]
  );

  return (
    <View title="Logbook">
      <HeaderButton title="Log Now" onClick={() => {dispatch(logTodos())}}/>
      {completedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
  );
}

export default LogbookView;

import { useEffect, useState } from "react";
import { fetchDeletedTodos, emptyTrash } from "../../store/todo-api";

import View from "./shared/View";
import HeaderButton from "./shared/HeaderButton";
import Todo from "../Todo/Todo";

function TrashView() {
  // Separate from Redux store for performance increase. Comparison pending.
  let [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchDeletedTodos().then((res) => {
      setTodos(res);
    });
  }, []);

  const emptyTrashHandler = async () => {
    const result = await emptyTrash();
    if (result) {
      fetchDeletedTodos().then((res) => {
        setTodos(res);
      });
    }
  };

  return (
    <View title="Trash">
      <HeaderButton title="Empty Trash" onClick={emptyTrashHandler} />
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
  );
}

export default TrashView;

import { todoActions } from "./todo-slice";
import { uiActions } from "./ui-slice";

const API_URL = "http://localhost:5000/todo";
// const API_URL = "https://polar-springs-52524.herokuapp.com/todo";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export const fetchTodos = () => async (dispatch) => {
  console.log("Fetching todos");
  const res = await fetch(`${API_URL}/all`);
  if (res.ok) {
    const todos = await res.json();
    dispatch(todoActions.addTodos(todos));
    // console.log(todos);
  }
};

export const fetchCompletedTodos = () => async (dispatch) => {
  console.log("Fetching completed todos");
  const res = await fetch(`${API_URL}/completed`);
  if (res.ok) {
    const todos = await res.json();
    dispatch(todoActions.addTodos(todos));
  }
};

export const fetchDeletedTodos = async () => {
  console.log("Fetching deleted todos");
  const res = await fetch(`${API_URL}/deleted`);
  if (res.ok) {
    const todos = await res.json();
    return todos;
  }
};

export const addTodo = (todo) => async (dispatch) => {
  console.log("Adding todo");
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      todo: todo,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    const newTodo = data.newTodo;
    console.log(newTodo);
    dispatch(todoActions.addTodo(newTodo));
    dispatch(uiActions.setOpenedTodo(newTodo.id));
  }
};

export const completeTodo = (id, completed) => async (dispatch) => {
  console.log("Completing todo");
  const res = await fetch(`${API_URL}/complete`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      id: id,
      completed: completed,
    }),
  });
  if (res.ok) {
    dispatch(todoActions.completeTodo(id));
  }
};

export const updateTodo = (todo) => async (dispatch) => {
  console.log("Updating todo");
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      todo: todo,
    }),
  });
  if (res.ok) {
    dispatch(todoActions.updateTodo(todo));
  }
};

export const logTodos = (todo) => async (dispatch) => {
  console.log("Logging todo");
  const res = await fetch(`${API_URL}/log`, {
    method: "PUT",
  });
  if (res.ok) {
    dispatch(todoActions.logTodos());
  }
};

export const removeTodo = (id) => async (dispatch) => {
  console.log("Removing todo");
  const res = await fetch(`${API_URL}/delete`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      id: id,
    }),
  });
  if (res.ok) {
    dispatch(todoActions.removeTodo(id));
  }
};

export const emptyTrash = async () => {
  console.log("Emptying trash");
  const res = await fetch(`${API_URL}/empty`, {
    method: "DELETE",
  });
  if (res.ok) {
    // dispatch(todoActions.emptyTrash());
    return true;
  }
  return false;
}

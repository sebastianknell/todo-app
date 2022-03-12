import { todoActions } from "./todo-slice";
import { uiActions } from "./ui-slice";

const API_URL = "http://localhost:8000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

// TODO add more validation and error handling

export const fetchTodos = () => async (dispatch) => {
  console.log("Fetching todos");
  const res = await fetch(`${API_URL}/todo/all`);
  if (res.ok) {
    const todos = await res.json();
    dispatch(todoActions.addTodos(todos));
    console.log(todos);
  }
};

export const fetchCompletedTodos = () => async (dispatch) => {
  console.log("Fetching completed todos");
  const res = await fetch(`${API_URL}/todo/completed`);
  if (res.ok) {
    const todos = await res.json();
    dispatch(todoActions.addTodos(todos));
  }
};

export const addTodo = (todo) => async (dispatch) => {
  console.log("Adding todo");
  const res = await fetch(`${API_URL}/todo/add`, {
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
  const res = await fetch(`${API_URL}/todo/complete`, {
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
  const res = await fetch(`${API_URL}/todo/update`, {
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

export const removeTodo = (id) => async (dispatch) => {
  console.log("Removing todo");
  const res = await fetch(`${API_URL}/todo/delete`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify({
      id: id,
    }),
  });
  if (res.ok) {
    dispatch(todoActions.removeTodo(id));
  }
};

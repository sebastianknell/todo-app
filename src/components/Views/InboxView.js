import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import { uiActions } from "../../store/ui-slice";

import Header from "./Header";
import Footer from "./Footer";
import Spacer from "../UI/Spacer";
import Todo from "../Todo/Todo";

import "./InboxView.css";

function InboxView(props) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const { selectedTodo, openedTodo } = useSelector((state) => state.ui);

  const handleNewTodo = () => {
    const id = 3; // TODO use unique id
    dispatch(
      todoActions.addTodo({
        id: id,
        completed: false,
        location: "Inbox",
      })
    );
    dispatch(uiActions.setOpenedTodo(id));
  };

  return (
    <div className="inbox-view">
      <Header title="Inbox" />
      <div className="inbox-body">
        {todos.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            highlighted={selectedTodo === item.id ? true : false}
            opened={openedTodo === item.id ? true : false}
          />
        ))}
      </div>
      <Spacer />
      <Footer onNewTodo={handleNewTodo} />
    </div>
  );
}

export default InboxView;

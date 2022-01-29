import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import InboxView from "./components/Views/InboxView";
import TodayView from "./components/Views/TodayView";
import UpcomingView from "./components/Views/UpcomingView";
import "./App.css";
import TodoContextProvider from "./store/TodoContextProvider";

function App() {
  const [selectedView, setSelectedView] = useState(0);

  const selectViewHandler = (view) => {
    setSelectedView(view);
  };

  const views = [<InboxView />, <TodayView />, <UpcomingView />];

  const todos = [
    {
      id: 1,
      title: "Buy milk",
      notes: "",
      deadline: new Date("2022-01-16"),
      completed: false,
      location: "Inbox",
    },
    {
      id: 2,
      title: "Walk the dog",
      notes: "",
      deadline: new Date("2022-01-16"),
      completed: false,
      location: "Inbox",
    },
  ];

  return (
    <div className="app">
      <Sidebar onSelectView={selectViewHandler} />
      <div className="view">
        <TodoContextProvider todos={todos}>
          {views[selectedView]}
        </TodoContextProvider>
      </div>
    </div>
  );
}

export default App;

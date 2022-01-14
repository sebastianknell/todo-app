import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import InboxView from './components/Views/InboxView'
import TodayView from './components/Views/TodayView'
import UpcomingView from "./components/Views/UpcomingView";
import "./App.css";

function App() {
  const [selectedView, setSelectedView] = useState(0);

  const selectViewHandler = (view) => {
    setSelectedView(view);
  };

  const views = [<InboxView />, <TodayView />, <UpcomingView />]

  return (
    <div className="app">
      <Sidebar onSelectView={selectViewHandler} />
      <div className="view">
        {views[selectedView]}
      </div>
    </div>
  );
}

export default App;

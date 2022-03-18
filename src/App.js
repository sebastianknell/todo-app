import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { uiActions } from "./store/ui-slice";
import { fetchTodos } from "./store/todo-api";

import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import InboxView from "./components/Views/InboxView";
import TodayView from "./components/Views/TodayView";
import UpcomingView from "./components/Views/UpcomingView";
import AnytimeView from "./components/Views/AnytimeView";
import SomedayView from "./components/Views/SomedayView";
import LogbookView from "./components/Views/LogbookView";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="app">
      <Sidebar />
      <div className="col grow">
        <div id="view" className="view">
          <Routes>
            <Route path="/" element={<Navigate replace to="/inbox" />} />
            <Route path="/inbox" element={<InboxView />} />
            <Route path="/today" element={<TodayView />} />
            <Route path="/upcoming" element={<UpcomingView />} />
            <Route path="/anytime" element={<AnytimeView />} />
            <Route path="/someday" element={<SomedayView />} />
            <Route path="/logbook" element={<LogbookView />} />
            {/* <Route path="*" element={<Navigate replace to="/inbox" />} /> */}
          </Routes>
        </div>
        <div className="row grow" id="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

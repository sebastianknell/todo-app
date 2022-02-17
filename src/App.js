// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import InboxView from "./components/Views/InboxView";
import TodayView from "./components/Views/TodayView";
import UpcomingView from "./components/Views/UpcomingView";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="view">
        <Routes>
          <Route path="/" element={<Navigate replace to="/inbox"/>} />
          <Route path="/inbox" element={<InboxView/>} />
          <Route path="/today" element={<TodayView />} />
          <Route path="/upcoming" element={<UpcomingView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

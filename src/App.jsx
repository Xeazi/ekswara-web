import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import EventPage from "./pages/EventPage";
import Destination from "./pages/Destination"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/destination" element={<Destination />} />
    </Routes>
  );
}

export default App;

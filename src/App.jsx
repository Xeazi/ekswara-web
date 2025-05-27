import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import EventPage from "./pages/EventPage";
import Destination from "./pages/Destination"
import Details from "./pages/Details";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/destination" element={<Destination />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
}

export default App;

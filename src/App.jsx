import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import EventPage from "./pages/EventPage";
import Destination from "./pages/Destination";
import Details from "./pages/Details";
import TicketReservationPage from "./pages/TicketReservationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/destination" element={<Destination />} />
      <Route path="/details" element={<Details />} />
      <Route
        path="/ticket-reservation/:eventId"
        element={<TicketReservationPage />}
      />
    </Routes>
  );
}

export default App;

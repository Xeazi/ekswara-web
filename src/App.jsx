import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import EventPage from "./pages/EventPage";
import Destination from "./pages/Destination";
import Details from "./pages/Details";
import TicketReservationPage from "./pages/TicketReservationPage";
import RecommendationPage from "./pages/RecommendationPage";

import AdminLogin from "./pages/AdminLogin";
import AdminEvents from "./pages/AdminEvents";
import AdminEventEdit from "./pages/AdminEventEdit";

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

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/destinations/1/events" element={<AdminEvents />} />
      <Route path="/admin/destinations/1/events/new" element={<AdminEventEdit />} />

      <Route path="/recommendation" element={<RecommendationPage />} />

    </Routes>
  );
}

export default App;

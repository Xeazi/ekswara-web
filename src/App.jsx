import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import EventPage from "./pages/EventPage";
import Destination from "./pages/Destination";
import Details from "./pages/Details";
import TicketReservationPage from "./pages/TicketReservationPage";

import AdminLogin from "./pages/AdminLogin";
import AdminEvents from "./pages/AdminEvents";
import AdminEventEdit from "./pages/AdminEventEdit";
import AdminDestinations from "./pages/AdminDestinations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      
      <Route path="/event" element={<EventPage />} />
      
      <Route path="/destination" element={<Destination />} />
      <Route path="/destination/:destinationId" element={<Details />} />
      
      <Route path="/details" element={<Details />} />
      
      <Route
        path="/ticket-reservation/:eventId"
        element={<TicketReservationPage />}
      />



      <Route path="/admin/destinations" element={<AdminDestinations />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/destinations/:destinationId" element={<AdminEvents />} />

      <Route path="/admin/destinations/1/events/new" element={<AdminEventEdit />} />

    </Routes>
  );
}

export default App;

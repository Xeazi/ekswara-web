import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

// icon
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

function ReservationPage() {
  const { eventId } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data event dari state yang dikirim melalui Link
    if (location.state && location.state.event) {
      setEvent(location.state.event);
      setLoading(false);
    } else {
      // Jika tidak ada state (misalnya user refresh page), beri pesan error
      console.log("No event data found");
      setLoading(false);
    }
  }, [location.state]);

  // Fungsi untuk memformat angka menjadi format Rupiah
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  // Kalkulasi harga
  const pricePerTicket = event ? event.price : 0;
  const serviceFee = 6000;
  const subtotal = pricePerTicket * quantity;
  const total = subtotal + serviceFee;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event tidak ditemukan</h1>
          <p className="text-gray-600 mb-4">
            Data event tidak tersedia. Silakan pilih event dari halaman event.
          </p>{" "}
          <Link
            to="/event"
            className="bg-main text-white px-4 py-2 rounded hover:bg-secondary hover:text-text transition-colors">
            Kembali ke Event Page
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="bg-yellow-400 py-3 text-center">
        <p className="text-text font-medium">
          Complete your order details immediately!
        </p>
      </div>
      {/* Konten utama */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-text mb-12">
          Ticket Reservation
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {" "}
          {/* Kolom Kiri: Customer Details */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-6">
              Customer Details
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-text-light mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
                  />
                </div>{" "}
                <div>
                  <label
                    htmlFor="identity"
                    className="block text-sm font-medium text-text-light mb-2">
                    Identity
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-text-light text-sm font-medium">
                      KTP
                    </span>
                    <input
                      type="text"
                      id="identity"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-light mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text-light mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
                  />
                </div>
              </form>
            </div>
          </div>
          {/* Kolom Kanan: Order Details */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-6">Order Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {/* Event Image dan Info */}
              <div className="mb-6">
                <img
                  src={`http://localhost:3000${event.image}`}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />{" "}
                <h3 className="font-bold text-text text-lg mb-1">
                  {event.name.toUpperCase()}
                </h3>
                <p className="text-sm text-text-gray">
                  {event.location} | Open {event.time}
                </p>
              </div>

              {/* Ticket Section */}
              <div className="border-b border-garis pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-text-light">
                        Ticket
                      </span>
                      <span className="text-sm font-medium text-text-light">
                        Amount
                      </span>
                    </div>
                    <p className="font-semibold text-text mb-1">{event.name}</p>
                    <p className="text-sm text-text-gray">
                      {pricePerTicket === 0
                        ? "Free"
                        : formatCurrency(pricePerTicket)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors">
                      <MinusIcon />
                    </button>
                    <span className="w-8 text-center font-bold text-lg text-text">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-full bg-bulletpoint hover:bg-secondary text-main flex items-center justify-center transition-colors">
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>

              {/* Voucher Section */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Voucher"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
                  />
                  <button className="px-6 py-2 bg-main text-white font-medium rounded-lg hover:bg-secondary hover:text-text transition-colors text-sm">
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-gray">Subtotal</span>
                  <span className="text-text">
                    {subtotal === 0 ? "Free" : formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-gray">Service Fee</span>
                  <span className="text-text">
                    {formatCurrency(serviceFee)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-garis pt-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-text">Total</span>
                  <span className="text-lg font-bold text-text">
                    {formatCurrency(total)}
                  </span>
                </div>
                <button className="w-full bg-main text-white font-bold py-3 rounded-lg hover:bg-secondary hover:text-text transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}

export default ReservationPage;

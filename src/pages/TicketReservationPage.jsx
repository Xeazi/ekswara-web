import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
require("dotenv").config();

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
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(2);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  // Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "MIDTRANS_CLIENT_KEY"); // Client key dari .env
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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

  // Fungsi untuk menangani pembayaran Midtrans
  const handleMidtransPay = async () => {
    // Clear previous errors
    setError("");
    setSuccess(false);

    if (!customerName || !customerEmail) {
      setError("Please fill in your Full Name and Email.");
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = `ticket-${event.id}-${Date.now()}`;

      // Buat array items untuk Midtrans
      const items = [
        {
          id: `ticket-${event.id}`,
          price: pricePerTicket,
          quantity: quantity,
          name: event.name,
        },
      ];

      // Tambahkan service fee jika ada
      if (serviceFee > 0) {
        items.push({
          id: "service-fee",
          price: serviceFee,
          quantity: 1,
          name: "Service Fee",
        });
      }

      console.log("Sending payment request:", {
        orderId,
        grossAmount: total,
        customerName,
        customerEmail,
        customerPhone,
        items,
      });

      const response = await axios.post(
        "http://localhost:3000/api/v1/payments/midtrans/transaction",
        {
          orderId,
          grossAmount: total,
          customerName,
          customerEmail,
          customerPhone,
          items,
        }
      );

      const { token } = response.data;

      console.log("Received token:", token);

      // Gunakan token untuk membuka Snap payment window
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log("Payment success:", result);
            setPaymentResult(result);
            setSuccess(true);
            setIsProcessing(false);
            
            // Redirect to event page after 3 seconds
            setTimeout(() => {
              navigate("/event");
            }, 3000);
          },
          onPending: function (result) {
            console.log("Payment pending:", result);
            setError("Payment is pending. Please check your payment status.");
            setIsProcessing(false);
          },
          onError: function (result) {
            console.log("Payment error:", result);
            setError("Payment failed. Please try again.");
            setIsProcessing(false);
          },
          onClose: function () {
            console.log("Payment popup closed");
            setIsProcessing(false);
          },
        });
      } else {
        setError("Midtrans Snap is not loaded. Please refresh the page.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Midtrans payment failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create Midtrans transaction.";
      setError(`Payment failed: ${errorMessage}`);
      setIsProcessing(false);
    }
  };

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
    <div className="bg-gray-50 min-h-screen relative">
      {/* Loading overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto mb-4"></div>
            <p className="text-lg font-medium">Processing Payment...</p>
            <p className="text-sm text-gray-600 mt-2">Please wait while we process your payment</p>
          </div>
        </div>
      )}

      <Header />
      <div className="bg-yellow-400 py-3 text-center">
        <p className="text-text font-medium">
          Complete your order details immediately!
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold">Payment Successful!</h3>
                  <p className="text-sm">Your ticket reservation has been confirmed. Redirecting to events page in 3 seconds...</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/event")}
                className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Go to Events
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-bold">Payment Error</h3>
                <p className="text-sm">{error}</p>
              </div>
            </div>
            <button 
              onClick={() => setError("")}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

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
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (error && !e.target.value) {
                        // Keep error if field is still empty
                      } else if (error && error.includes("Full Name")) {
                        setError(""); // Clear error when user starts typing
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main ${
                      error && error.includes("Full Name") && !customerName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
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
                    value={customerEmail}
                    onChange={(e) => {
                      setCustomerEmail(e.target.value);
                      if (error && !e.target.value) {
                        // Keep error if field is still empty
                      } else if (error && error.includes("Email")) {
                        setError(""); // Clear error when user starts typing
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main ${
                      error && error.includes("Email") && !customerEmail
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email address"
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
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
                    placeholder="Enter your phone number"
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
                  src={event.image}
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
                <button
                  onClick={handleMidtransPay}
                  disabled={isProcessing}
                  className="w-full bg-main text-white font-bold py-3 rounded-lg hover:bg-secondary hover:text-text transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {isProcessing ? "Processing..." : "Order Now"}
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

// Halaman EventPage: Menampilkan daftar event dengan filter, pagination, dan sorting
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/Button";
import { EventCard } from "../components/EventCard";
import { Pagination } from "../components/Pagination";

// Placeholder image untuk event yang tidak memiliki gambar spesifik
const placeholderImg = "https://placehold.co/270x270/EBF5FF/7F9CF5?text=Event";

// API Configuration
const API_BASE_URL = "http://localhost:3000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`❌ API Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('❌ Network Error:', error.message);
    } else {
      console.error('❌ Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Komponen utama halaman event
function EventPage() {
  // ===== VARIABLES DAN STATE =====
  // Inisialisasi default date range (Mei-Juli 2025)
  const defaultStartDate = "2025-05-01";
  const defaultEndDate = "2025-07-31";
  const eventsPerPage = 3;
  
  // State untuk semua event dari backend
  const [allEvents, setAllEvents] = useState([]);
  // State untuk event yang sudah difilter
  const [filteredEvents, setFilteredEvents] = useState([]);
  // State untuk loading dan error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State untuk filter kategori taman
  const [parkFilters, setParkFilters] = useState({
    allParks: true,
    cityPark: false,
    amusementParks: false,
    educationParks: false,
  });
  // State untuk filter tanggal
  const [dateRange, setDateRange] = useState({
    start: defaultStartDate,
    end: defaultEndDate,
  });
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Function to fetch all events
  const fetchAllEvents = async () => {
    const response = await api.get('/events');
    return response.data;
  };

  // Helper function to get category from destination_id
  const getCategoryFromDestination = (destinationId) => {
    const categories = {
      1: "City Park",
      2: "Amusement Parks", 
      3: "Education Parks"
    };
    return categories[destinationId] || "City Park";
  };

  // Helper function to format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Helper function to get location from destination ID
  const getLocationFromDestination = (destinationId) => {
    const locations = {
      1: "Taman Ismail Marzuki, Jakarta",
      2: "J-Sky Ferris Wheel, Jakarta", 
      3: "Taman Agro Cibugary, Jakarta"
    };
    return locations[destinationId] || "Jakarta";
  };

  // Handler untuk perubahan filter kategori taman
  const handleParkFilterChange = (event) => {
    const { name, checked } = event.target;

    setParkFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (name === "allParks") {
        return {
          allParks: true,
          cityPark: false,
          amusementParks: false,
          educationParks: false,
        };
      } else {
        newFilters[name] = checked;
        newFilters.allParks = false;

        const specificFiltersActive = Object.entries(newFilters)
          .filter(([key]) => key !== "allParks")
          .some(([, value]) => value);
        if (!specificFiltersActive) {
          newFilters.allParks = true;
        }
        return newFilters;
      }
    });
  };

  // Handler untuk perubahan filter tanggal
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };

  // Handler untuk ganti halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format tampilan rentang tanggal
  const formatDateRangeDisplay = (start, end) => {
    if (!start || !end) return "Select date range";
    const options = { month: "short", day: "numeric" };
    const startDate = new Date(start + "T00:00:00").toLocaleDateString(
      "en-US",
      options
    );
    const endDate = new Date(end + "T00:00:00").toLocaleDateString(
      "en-US",
      options
    );
    return `${startDate} - ${endDate}`;
  };

  // Hitung index event untuk pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  // Fetch events from backend on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const eventsData = await fetchAllEvents();
        
        // Transform events data for frontend use
        const transformedEvents = eventsData.map(event => ({
          ...event,
          category: getCategoryFromDestination(event.destination_id),
          image: event.images?.[0]?.image_url || placeholderImg,
          dateDisplay: formatDate(event.date),
          fullDate: new Date(event.date),
          location: getLocationFromDestination(event.destination_id),
        }));
        
        setAllEvents(transformedEvents);
        
      } catch (err) {
        console.error('Failed to fetch events:', err);
        
        // Handle different types of errors
        if (err.code === 'ECONNABORTED') {
          setError('Request timeout. Please check your internet connection.');
        } else if (err.response?.status === 404) {
          setError('Events not found. Please contact support.');
        } else if (err.response?.status >= 500) {
          setError('Server error. Please try again later.');
        } else if (!err.response) {
          setError('Unable to connect to server. Please make sure the backend is running on http://localhost:3000');
        } else {
          setError(err.response?.data?.message || 'Failed to load events. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // useEffect: Melakukan filter data setiap kali filter berubah
  useEffect(() => {
    if (allEvents.length === 0) return;

    // Mulai dengan event yang aktif (status: held)
    let newFilteredEvents = allEvents.filter(event => event.status === "held");

    // Filter berdasarkan kategori taman
    const activeParkCategories = Object.entries(parkFilters)
      .filter(([key, value]) => value && key !== "allParks")
      .map(([key]) => {
        if (key === "cityPark") return "City Park";
        if (key === "amusementParks") return "Amusement Parks";
        if (key === "educationParks") return "Education Parks";
        return null;
      })
      .filter(Boolean);

    if (activeParkCategories.length > 0) {
      newFilteredEvents = newFilteredEvents.filter((event) =>
        activeParkCategories.includes(event.category)
      );
    }

    // Filter berdasarkan jarak tanggal
    if (dateRange.start && dateRange.end) {
      try {
        const startDate = new Date(dateRange.start + "T00:00:00");
        const endDate = new Date(dateRange.end + "T23:59:59");
        if (!isNaN(startDate) && !isNaN(endDate)) {
          newFilteredEvents = newFilteredEvents.filter((event) => {
            const eventDate = event.fullDate;
            return eventDate >= startDate && eventDate <= endDate;
          });
        }
      } catch (error) {
        console.error("Invalid date format for filtering:", error);
      }
    }

    setFilteredEvents(newFilteredEvents);
    setCurrentPage(1); // Reset ke halaman 1 setiap filter berubah
  }, [allEvents, parkFilters, dateRange]);

  return (
    
    <div className="w-full bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 text-sm text-[var(--color-text-gray)]">
          <span>Home</span> &gt;{" "}
          <span className="text-[var(--color-text)] font-semibold">Event</span>{" "}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-10">
          Upcoming Event
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 flex-shrink-0">
            <div className="bg-[var(--color-main)] text-white p-5 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-semibold mb-1">Place</h3>
              <div className="flex items-center bg-white text-[var(--color-main)] p-3 rounded-md mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">
                  {formatDateRangeDisplay(dateRange.start, dateRange.end)}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-xs font-medium mb-1 opacity-90">
                    From
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="start"
                    value={dateRange.start}
                    onChange={handleDateChange}
                    className="w-full p-2 rounded-md border border-[var(--color-secondary)] text-white-200 text-sm focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-xs font-medium mb-1 opacity-90">
                    To
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="end"
                    value={dateRange.end}
                    onChange={handleDateChange}
                    className="w-full p-2 rounded-md border border-[var(--color-secondary)] text-white-200 text-sm focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>
              </div>
            </div>
            {/* Filter kategori taman */}
            <div className="bg-white p-5 rounded-lg shadow-lg border border-[var(--color-garis)]">
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                Explore Park
              </h3>
              <div className="space-y-3">
                {[
                  { id: "allParks", label: "All Parks" },
                  { id: "cityPark", label: "City Park" },
                  { id: "amusementParks", label: "Amusement Parks" },
                  { id: "educationParks", label: "Education Parks" },
                ].map((filter) => (
                  <label
                    key={filter.id}
                    className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name={filter.id}
                      checked={parkFilters[filter.id]}
                      onChange={handleParkFilterChange}
                      className="h-4 w-4 text-[var(--color-main)] border-[var(--color-garis)] rounded focus:ring-[var(--color-main)] focus:ring-offset-0"
                    />
                    <span className="ml-2 text-[var(--color-text-gray)] text-sm">
                      {filter.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
          {/* Daftar event utama */}
          <main className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
              <p className="text-[var(--color-text-gray)] text-sm">
                {filteredEvents.length} results
              </p>
              <div className="relative">
                <p className="text-[var(--color-text)]">Featured</p>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--color-text-gray)]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Render loading, error, or event cards */}
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-main)] mx-auto"></div>
                <p className="mt-3 text-[var(--color-text)] text-lg">Loading events...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="mt-3 text-[var(--color-text)] text-lg">Error loading events</p>
                <p className="text-[var(--color-text-gray)] text-sm">{error}</p>
              </div>
            ) : currentEvents.length > 0 ? (
              <div className="space-y-6">
                {currentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-3 text-[var(--color-text)] text-lg">No events found.</p>
                <p className="text-[var(--color-text-gray)] text-sm">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredEvents.length > eventsPerPage && (
              <Pagination
                eventsPerPage={eventsPerPage}
                totalEvents={filteredEvents.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventPage;

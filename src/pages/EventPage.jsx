// Halaman EventPage: Menampilkan daftar event dengan filter, pagination, dan sorting
import React, { useState, useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/Button";
import { EventCard } from "../components/EventCard";
import { Pagination } from "../components/Pagination";

// Placeholder image untuk event yang tidak memiliki gambar spesifik
const placeholderImg = "https://placehold.co/270x270/EBF5FF/7F9CF5?text=Event";

// Data semua event (dummy data)
const allEventsData = [
  {
    id: 1,
    image: placeholderImg, // Gambar spesifik
    location: "Taman Ismail Marzuki, Jakarta",
    title: "Pameran dan Workshop Seniman Lokal",
    description:
      "Festival seni tahunan yang menampilkan karya seniman kontemporer indonesia dengan workshop langsung oleh para maestro seni.",
    dateDisplay: "8 Mei 2025", // Untuk tampilan
    fullDate: new Date(2025, 4, 8), // Untuk filter (Bulan di JS: 0=Jan, 4=Mei)
    time: "10:00-16:00",
    price: "Rp.68,000",
    category: "City Park",
  },
  {
    id: 2,
    image: placeholderImg, // Placeholder spesifik atau gambar Anda
    location: "Taman Agro Cilangkap, Jakarta",
    title: "Harvest Festival & Urban Farming",
    description:
      "Education is an event that invites the public to experience hands-on learning about plant cultivation, hydroponic vegetable harvesting, and urban agriculture.",
    dateDisplay: "29 Mei 2025",
    fullDate: new Date(2025, 4, 29),
    time: "08:00-12:00",
    price: "Free",
    category: "Education Parks",
  },
  {
    id: 3,
    image: placeholderImg,
    location: "Taman Ismail Marzuki, Jakarta",
    title: "Pertunjukan dan Workshop Tari Tradisional",
    description:
      "Festival tari yang menampilkan beragam pertunjukan dari tari tradisional hingga kontemporer dengan workshop langsung dari koreografer ternama.",
    dateDisplay: "15 Juni 2025",
    fullDate: new Date(2025, 5, 15),
    time: "16:00-18:00",
    price: "Free",
    category: "City Park",
  },
  {
    id: 4,
    image: placeholderImg,
    location: "J-Sky Ferris Wheel, Jakarta",
    title: "Misi Rahasia di Atas Awan",
    description:
      "Program khusus untuk anak-anak dengan aktivitas edukatif tentang mekanisme bianglala, pengetahuan geografi kota Jakarta, dan tantangan mencari landmark kota dari ketinggian.",
    dateDisplay: "22 Juni 2025",
    fullDate: new Date(2025, 5, 22),
    time: "09:00-17:00",
    price: "Rp.50,000",
    category: "Amusement Parks",
  },
];

// Komponen utama halaman event
function EventPage() {
  // Inisialisasi default date range (Mei-Juni 2025)
  const defaultStartDate = "2025-05-01";
  const defaultEndDate = "2025-06-30";
  // State untuk event yang sudah difilter
  const [filteredEvents, setFilteredEvents] = useState(allEventsData);
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
  const eventsPerPage = 3;

  // useEffect: Melakukan filter data setiap kali filter berubah
  useEffect(() => {
    let newFilteredEvents = [...allEventsData];

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
  }, [parkFilters, dateRange]);

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
        newFilters.allParks = false; //kalo filter spesifik dipilih, 'All Parks' ngga aktif

        //kalo semua filter spesifik tidak aktif,'All Parks' aktfi
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

  // Hitung index event untuk pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

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

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 text-sm text-gray-500">
          <span>Home</span> &gt;{" "}
          <span className="text-text font-semibold">Event</span>{" "}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text mb-10">
          Upcoming Event
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 flex-shrink-0">
            <div className="bg-main text-white p-5 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-semibold mb-1">Place</h3>
              <div className="flex items-center bg-white text-green-700 p-3 rounded-md mb-4">
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
                    className="w-full p-2 rounded-md border border-secondary text-white text-sm focus:ring-2 focus:ring-green-300"
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
                    className="w-full p-2 rounded-md border border-secondary text-white text-sm focus:ring-2 focus:ring-green-300"
                  />
                </div>
              </div>
            </div>
            {/* Filter kategori taman */}
            <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-200">
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
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-gray-700 text-sm">
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
              <p className="text-gray-600 text-sm">
                {filteredEvents.length} results
              </p>
              <div className="relative">
                <select className="text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none pr-8">
                  <option>Featured</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Render event card atau pesan jika tidak ada event */}
            {currentEvents.length > 0 ? (
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
                <p className="mt-3 text-text text-lg">No events found.</p>
                <p className="text-gray-500 text-sm">
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

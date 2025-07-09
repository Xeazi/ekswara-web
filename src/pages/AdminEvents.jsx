import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const formatPrice = (price) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };



function AdminEvents() {

    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    const {destinationId} = useParams();

    const navigate = useNavigate();

    const username = localStorage.getItem('username');

    useEffect(() => {
        async function fetchEvents() {
            
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:3000/admin/api/v1/destinations/${destinationId}/events`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }); 
        
                // untuk destination edit
                // localStorage.setItem("eventsList", JSON.stringify(res.data)); 
                
                // ini alternatif gaperlu local storage
                // navigate('/target', { state: data }); 
                
                setEvents(res.data);
                console.log(res.data);

                setLoading(false);

            } catch (error) {
                console.error(error);
                navigate('../admin/login');
            }

        }
        
        fetchEvents();
        
    }, []);

    async function deleteEvent(eventId, eventName) {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${eventName}?`);
        if (!confirmDelete) return; 
        try {
            const token = localStorage.getItem("token");  
            await axios.delete(
                `http://localhost:3000/admin/api/v1/destinations/${destinationId}/events/${eventId}/delete`,
                {
                  headers: {
                        Authorization: `Bearer ${token}`,
                  },
                }
            );    
            // Remove from state without re-fetching
            setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
        } catch (error) {
            console.error("Delete failed:", error.response?.data || error.message);
            alert("Failed to delete the event.");
        }
    }

    function editEvent(event) {
        localStorage.setItem('event', JSON.stringify(event));
        navigate(`${event.id}`)
    }

    if (loading) return <p>Loading...</p>
    if (!events) return <p>events not found.</p>

  return (
    <div className="min-h-screen bg-white  items-center">
      <Header />

      <div className="w-full bg-green-700 text-white px-10 py-6 flex items-center gap-4">
        <div className="bg-white text-green-700 rounded-full w-14 h-14 flex items-center justify-center text-3xl">
          👤
        </div>
        <h2 className="text-xl font-semibold">{username}</h2>
      </div>

      <h2 className="mt-10 ml-9 text-2xl font-bold text-blue-900">Event Management</h2>

      <button className="mt-6 ml-12 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
        onClick={() => navigate(`new`)}
      >
        + Add Event
      </button>

      <div className="overflow-x-auto mt-6 mx-9 mb-100 w-11/12 max-w-6xl">
        <table className="min-w-full border text-sm text-left mt-4">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-4 py-2 border">NO</th>
              <th className="px-4 py-2 border">Name Event</th>
              <th className="px-4 py-2 border">Status Event</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Description Event</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className="bg-white text-gray-800">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{event.name}</td>
                <td className="px-4 py-2 border">{event.status}</td>
                <td className="px-4 py-2 border">{event.date}</td>
                <td className="px-4 py-2 border">{event.time}</td>
                <td className="px-4 py-2 border">
                  <img src={`http://localhost:3000${event.image_url}`} alt="Event" className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border">{event.description}</td>
                <td className="px-4 py-2 border">{formatPrice(event.price)}</td>
                <td className="px-4 py-2 border space-y-1">
                  <button className="bg-green-700 text-white px-4 py-1 rounded w-full" onClick={() => editEvent(event)}>Edit</button>
                  <button className="bg-red-800 text-white px-4 py-1 rounded w-full" onClick={() => deleteEvent(event.id, event.name) }>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}

export default AdminEvents;

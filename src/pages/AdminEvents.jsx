import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const mockEvents = [
  {
    id: 1,
    name: 'Pameran dan Workshop Seniman Lokal',
    location: 'Taman Ismail Marzuki',
    date: '08/05/2025',
    time: '10:00–16:00',
    picture: 'https://via.placeholder.com/50', // Replace with real URL
    description: 'Program khusus untuk anak-anak dengan aktivitas edukatif tentang mekanisme bianglala, pengetahuan...',
    price: 'Rp.68,000',
  }
];

function AdminEvents() {

    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    const {destinationId} = useParams();

    const navigate = useNavigate();

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
                // navigate('../admin/login');
            }

        }
        
        fetchEvents();
        
    }, []);

    if (loading) return <p>Loading...</p>
    if (!events) return <p>events not found.</p>

  return (
    <div className="min-h-screen bg-white  items-center">
      <Header />

      <div className="w-full bg-green-700 text-white px-10 py-6 flex items-center gap-4">
        <div className="bg-white text-green-700 rounded-full w-14 h-14 flex items-center justify-center text-3xl">
          👤
        </div>
        <h2 className="text-xl font-semibold">Taman Ismail Marzuki</h2>
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
              <th className="px-4 py-2 border">Location Event</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Picture</th>
              <th className="px-4 py-2 border">Description Event</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockEvents.map((event, index) => (
              <tr key={event.id} className="bg-white text-gray-800">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{event.name}</td>
                <td className="px-4 py-2 border">{event.location}</td>
                <td className="px-4 py-2 border">{event.date}</td>
                <td className="px-4 py-2 border">{event.time}</td>
                <td className="px-4 py-2 border">
                  <img src={event.picture} alt="Event" className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border">{event.description}</td>
                <td className="px-4 py-2 border">{event.price}</td>
                <td className="px-4 py-2 border space-y-1">
                  <button className="bg-green-700 text-white px-4 py-1 rounded w-full" onClick={() => navigate(`new`)}>Edit</button>
                  <button className="bg-red-800 text-white px-4 py-1 rounded w-full">Delete</button>
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

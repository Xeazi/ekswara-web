import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

function AdminDestination({destinationId, name, img_url}) {
    return (
        <Link to={'./' + destinationId}>
            <div className="flex w-full gap-6 text-text hover:bg-gray-200 shadow-2xl rounded-xl border-main border-2 items-center">
                <div className="h-[244px] w-[244px] bg-gray-300 m-4 rounded-2xl">
                    <img src={img_url} alt={"gambar " + name} />
                </div>
                <div>
                    <p className="text-3xl">
                        {name}
                    </p>
                </div>
            </div>
        </Link>
    )
}


function AdminDestinations() {

    const [destinations, setDestinations] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const location = useLocation();

    const username = localStorage.getItem('username');

    useEffect(() => {
        async function fetchDestinations() {
            
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/admin/api/v1/destinations', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }); 
        
                // untuk destination edit
                // localStorage.setItem("destinationsList", JSON.stringify(res.data)); 
                
                // ini alternatif gaperlu local storage
                // navigate('/target', { state: data }); 
                
                setDestinations(res.data);
                console.log(res.data);

                setLoading(false);

            } catch (error) {
                console.error(error);
                navigate('../admin/login');
            }

        }
        
        fetchDestinations();
        
    }, []);

    if (loading) return <p>Loading...</p>
    if (!destinations) return <p>destinations not found.</p>

    return (
        <div className="w-full">

            <Header />

            <div className="w-full bg-green-700 text-white px-10 py-6 flex items-center gap-4">
                <div className="bg-white text-green-700 rounded-full w-14 h-14 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h2 className="text-xl font-semibold">{username}</h2>
            </div>

            <section className="min-h-220 my-12 mx-auto w-full max-w-6xl">
                {destinations.map((destination) => (
                    <AdminDestination
                        destinationId={destination.id}
                        name={destination.name}
                        img_url={destination.img_url}
                        key={destination.id}
                    />
                ))}
            </section>

            <Footer />
        </div>
    )
}

export default AdminDestinations;
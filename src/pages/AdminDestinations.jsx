import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

function AdminDestination({destinationId, name, img_url}) {
    return (
        <Link to={'./' + destinationId}>
            <div className="flex w-full gap-6 text-text hover:bg-gray-200 shadow-2xl rounded-xl border-main border-2 items-center">
                <div className="h-[244px] w-[244px]">
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
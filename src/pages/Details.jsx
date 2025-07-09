import { DetailImages } from "../components/DetailsImages";
import { DetailsDetails } from "../components/DetailsDetails";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Details() {    
    
    const {destinationId} = useParams();

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/destinations/${destinationId}`);
                
                setDetails(res.data);
    
                console.log(res.data);
                setLoading(false);
                
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
                
        }
        
        fetchDetails();
        
    }, [destinationId]);

    if (loading) return <p>Loading...</p>;
    if (!details) return <p>Details not found.</p>;

    const {
        name,
        about,
        history,
        facilities,
        visiting_info,
        duration_of_visit,
        group_size,
        ages,
        languages,
        map_url
    } = details;


    return (
        <div className="w-full text-text *:space-y-6">

            <Header />

            <section className="flex flex-col items-center container mx-auto my-12 max-w-6xl px-4">

                <h2 className="lg:self-start text-4xl font-bold">
                    {name}
                </h2>
                <DetailImages />
                <DetailsDetails durationOfVisit={duration_of_visit} groupSize={group_size} ages={ages} languages={languages} />

            </section>

            <section className="container mx-auto my-12 max-w-6xl px-4">

                <h2 className="text-3xl font-bold">
                    About The Park
                </h2>
                <p className="max-w-[90ch]">
                    {about}
                </p>
                <h3 className="text-2xl">
                    History and Purpose
                </h3>
                <p className="max-w-[50ch] pl-4">
                    {history}
                </p>
                
                <div className=" max-w-[50ch] h-[1px] bg-garis my-8"></div>

            </section>

            <section className="container mx-auto my-12 max-w-6xl px-4">

                <h2 className="text-3xl font-bold">
                    Main Facilities
                </h2>

                <ul className="grid grid-cols-2 gap-y-4 list-none">
                    {facilities.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-bulletpoint rounded-full flex-shrink-0"></div>
                            <span className="">{item}</span>
                        </li>
                    ))}
                </ul>

                <div className="w-full h-[3px] my-12 bg-garis"></div>

            </section>

            <section className="container mx-auto my-12 max-w-6xl px-4">

                <h2 className="text-4xl font-bold">
                    Access and Visiting Info
                </h2>

                <p>
                    <span className="font-bold">
                        Address: {' '}
                    </span>
                    {visiting_info.address}
                </p>

                <p className="font-bold">
                    Public Transportation: {' '}
                </p>
                <ul className="list-disc pl-8 max-w-[90ch] leading-[4ch]">
                    {visiting_info.transportation.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>

                <p>
                    <span className="font-bold">
                        Opening Hours: {' '}
                    </span>
                    {visiting_info.openingHours}
                </p>

            </section>

            <section className="container mx-auto my-12 max-w-6xl px-4">
                <h2 className="text-3xl font-bold">
                    Maps
                </h2>
                    
                <iframe
                src={map_url}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Map - Taman Ismail Marzuki"
                />

            </section>
            <Footer />
        </div>
    )

}

export default Details;
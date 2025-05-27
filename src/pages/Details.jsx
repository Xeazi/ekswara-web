import { DetailImages } from "../components/DetailsImages";
import { DetailsDetails } from "../components/DetailsDetails";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

function Details(/*{name, about, history, facilities, visitingInfo, maps }*/) {
    
    // input:

    // facilities = array
    // visitingInfo = {address, transportation: [], openingHours}
    // maps = jujur gatau

    // sementara buat Details ini
    
    const name = 'Taman Ismail Marzuki';

    const about = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam rem eos aut fugit aliquam soluta maiores expedita, ullam sequi ipsum suscipit laudantium possimus quam iste ipsam est consequuntur modi totam illo nam incidunt quas necessitatibus inventore temporibus. Inventore fugiat laudantium dolor, quaerat officia cupiditate deleniti culpa excepturi dolorum, sunt iusto.';

    const history = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam rem eos aut fugit aliquam soluta maiores expedita, ullam sequi ipsum suscipit laudantium possimus quam iste ipsam est consequuntur modi totam illo nam incidunt quas necessitatibus inventore temporibus. Inventore fugiat laudantium dolor, quaerat officia cupiditate deleniti culpa excepturi dolorum, sunt iusto.';
    
    const facilities = ['Teater Jakarta', 'Graha Bhakti Budaya', 'Cipta Galleries I, II, III', 'Prayer Room (Mushola) & Toilets', 'Jakarta Planetarium and Observatory', 'Jakarta Public Library', 'Jakarta Institute of the Arts (IKJ)'];

    const visitingInfo = {
        address: 'Jalan Cikina Raya No. 73, Menteng, Central Jakarta.',
        transportation: [
            'Commuter Line: Cikini Station, followed by a short walk or ride.',
            'TransJakarta: Corridor 5H (Kampung Melayu - Tanah Abang) or 6H (Senen - Lebak Bulus).',
            'MRT: Bundaran HI Station, then continue via online ride-hailing service.'
        ],
        openingHours: 'Daily, from 9 AM to 9 PM.'
    };

    // sementara buat DetailsDetails

    const durationOfVisit = '± 2-3 Hours';
    const groupSize = 'Max. 15 people';
    const ages = '18-50 years';
    const languages = 'Indonesian, English'

    return (
        <div className="w-full text-text *:space-y-6">

            <Header />

            <section className="flex flex-col items-center container mx-auto my-12 max-w-6xl px-4">

                <h2 className="lg:self-start text-4xl font-bold">
                    {name}
                </h2>
                <DetailImages />
                <DetailsDetails durationOfVisit={durationOfVisit} groupSize={groupSize} ages={ages} languages={languages} />

            </section>

            <section className="container mx-auto my-12 max-w-6xl px-4">

                <h2 className="text-3xl font-bold">
                    About The Park
                </h2>
                <p className="">
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
                    {visitingInfo.address}
                </p>

                <p className="font-bold">
                    Public Transportation: {' '}
                </p>
                <ul className="list-disc pl-8">
                    {visitingInfo.transportation.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>

                <p>
                    <span className="font-bold">
                        Opening Hours: {' '}
                    </span>
                    {visitingInfo.openingHours}
                </p>

            </section>

            <section className="container mx-auto my-12 max-w-6xl px-4">
                <h2 className="text-3xl font-bold">
                    Maps
                </h2>

                {/* kurtau maps disini sih seharusnya apalah gitu yang seperti itu */}

            </section>

            <Footer />
        </div>
    )

}

export default Details;
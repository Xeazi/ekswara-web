import './App.css'
import {Button} from './components/button.jsx'
import {Footer} from './components/footer.jsx'
import {Header} from './components/header.jsx'

import Details from './pages/Details.jsx'

import { StrictMode } from 'react'

// tuker import App from './App.jsx' jadi './test.jsx'


function App() {

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

    // const maps = 'gatau';
   
    return (
        <StrictMode>
            <Details 
                name={'Taman Ismail Marzuki'} 
                about={about} 
                history={history} 
                facilities={facilities} 
                visitingInfo={visitingInfo}
            />
        </StrictMode>
    )
};

export default App;

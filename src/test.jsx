import './App.css'
import {Button} from './components/button.jsx'
import {Footer} from './components/footer.jsx'
import {Header} from './components/header.jsx'

import {DestinationCard} from './components/DestinationCard.jsx'
import destinationImage from './assets/image/taman-ismail-marzuki/Perpustakaan-Taman-Ismail-Marzuki-Cikini.jpg';

import {DestinationPopularCard} from './components/DestinationPopularCard.jsx'

import { DetailImages } from './components/DetailsImages.jsx'

import { StrictMode } from 'react'

// tuker import App from './App.jsx' jadi './test.jsx'


function App() {
    const icon = (<svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
  <rect x="0.97998" width="80" height="80" rx="40" fill="#FEF7F4"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M40.111 25.3023C38.3928 25.3023 36.9999 26.5049 36.9999 27.9884C36.9999 29.4718 38.3928 30.6744 40.111 30.6744C41.8292 30.6744 43.2221 29.4718 43.2221 27.9884C43.2221 26.5049 41.8292 25.3023 40.111 25.3023ZM34.3333 27.9884C34.3333 25.2334 36.9201 23 40.111 23C43.3021 23 45.8887 25.2334 45.8887 27.9884C45.8887 30.7434 43.3021 32.9767 40.111 32.9767C36.9201 32.9767 34.3333 30.7434 34.3333 27.9884ZM37.3185 35.3054C37.6737 35.2888 38.0163 35.279 38.3332 35.279C39.3183 35.279 40.3846 35.3735 41.3444 35.4926C44.0495 35.828 46.0974 37.5514 46.9159 39.6714C47.1013 40.1515 47.6637 40.4438 48.242 40.3606L51.4473 39.8993C52.1737 39.7948 52.8606 40.2184 52.9816 40.8456C53.1027 41.4728 52.6121 42.0658 51.8857 42.1704L48.6804 42.6316C46.8078 42.9011 44.9865 41.9542 44.3862 40.3994C43.8399 38.9846 42.5323 37.9659 40.9654 37.7715C40.4895 37.7124 40.0051 37.6626 39.5345 37.6288L39.0524 41.7905C38.9032 43.0793 38.8858 43.4196 38.9866 43.7237C39.0872 44.0276 39.3105 44.3084 40.2269 45.3339L48.1006 54.1457C48.5506 54.6489 48.4425 55.3719 47.8594 55.7602C47.2765 56.1485 46.4391 56.0553 45.9894 55.5519L38.1155 46.7403C38.073 46.6927 38.031 46.6458 37.9896 46.5994C37.2595 45.7839 36.6819 45.1388 36.4227 44.3571C36.1637 43.5752 36.2584 42.7639 36.3784 41.7386C36.3852 41.6803 36.3921 41.6212 36.399 41.5615L36.8508 37.6616C33.8759 38.0817 31.6667 40.4963 31.6667 43.3372C31.6667 43.9729 31.0697 44.4883 30.3334 44.4883C29.597 44.4883 29.0001 43.9729 29.0001 43.3372C29.0001 39.284 32.4023 35.5355 37.3185 35.3054ZM35.9281 46.8131C36.6502 46.9377 37.1185 47.5441 36.9741 48.1676C36.3384 50.9117 34.6024 53.3744 32.0715 55.1224L31.1663 55.7478C30.5913 56.1448 29.7522 56.0644 29.2922 55.5679C28.8322 55.0715 28.9254 54.347 29.5005 53.9498L30.4056 53.3246C32.4467 51.9149 33.8466 49.9289 34.3592 47.716C34.5036 47.0926 35.2061 46.6883 35.9281 46.8131Z" fill="#2E7D32"/>
</svg>)

    return (
        <StrictMode>
            <Header></Header>

            <p>the test works</p>

            <Button text='TESTER BATTOUNE'>test button</Button>

            <DestinationCard 
                href = '#' 
                imageUrl = {{destinationImage}} 
                name = 'Taman Ismail Marzuki' 
                location = 'Central Jakarta' 
                parkHours = '9 AM to 9 PM'>
            </DestinationCard>

            <div style={{backgroundColor: "#C4D9C5"}}>
                <DestinationPopularCard
                    title = "Natural Walks"
                    icon = {icon}
                >
                </DestinationPopularCard>
            </div>

            <DetailImages></DetailImages>
            
            <Footer></Footer>
        </StrictMode>
    )
};

export default App;

import React from 'react';

import img1 from '../assets/image/3f5f565f2b9546ef73e97c65fc7c1379.jpg';
import img2 from '../assets/image/93b73c16f5550addb4674c9b3d74f7dd.jpg';
import img3 from '../assets/image/b8a0e4349b93f5d8de1836a52d72586d.jpg';
import img4 from '../assets/image/playground-J-Sky-Ferris-Wheel.webp';
import img5 from '../assets/image/j-sky/0fa611ce-4af3-48d3-bc0e-6bb1a7891f29_sm.jpg';
import img6 from '../assets/image/taman ismail/Taman Ismail Marzuki, Jakarta ID.jpg';

export const GalleryWisata = () => {
    return (
        <section className="mx-auto my-16 px-4 max-w-[1220px]">
        <h2 className="text-2xl font-bold text-text mb-6">Gallery Wisata</h2>
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 flex flex-col gap-4 h-[600px]">
                <img src={img1} alt="Gallery 1" className="rounded-md object-cover w-full h-full" />
                <img src={img2} alt="Gallery 2" className="rounded-md object-cover w-full h-full" />
            </div>
            <div className="col-span-1 h-[600px]">
                <img src={img3} alt="Gallery 3" className="rounded-md object-cover w-full h-full" />
            </div>
            <div className="col-span-1 flex flex-col gap-4 h-[600px]">
                <img src={img4} alt="Gallery 4" className="rounded-md object-cover w-full h-full" />
            <div className="grid grid-cols-2 gap-4 h-[600px]">
                <img src={img5} alt="Gallery 5" className="rounded-md object-cover w-full h-full" />
                <img src={img6} alt="Gallery 6" className="rounded-md object-cover w-full h-full" />
            </div>
            </div>
        </div>
        </section>
    );
};



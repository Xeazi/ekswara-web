import React from "react";
import tamanImage from "../assets/image/taman-ismail-marzuki/Perpustakaan-Taman-Ismail-Marzuki-Cikini.jpg";
import jskyImage from "../assets/image/j-sky/IMG_0643.jpeg";
import cibugaryImage from "../assets/image/cibugary/CibugaryFarmWisataEdukasiCibugary.jpg";


// ini bisa di di export ke page mana aja sih
const recommendedPlaces = [
  {
    id: 1,
    name: "Taman Ismail Marzuki",
    image: tamanImage,
  },
  {
    id: 2,
    name: "J-Sky Ferris Wheel",
    image: jskyImage,
  },
  {
    id: 3,
    name: "Cibugary Farm",
    image: cibugaryImage,
  },
];

export const RecommendComponent = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedPlaces.map((place) => (
          <div
            key={place.id}
            className="rounded-lg overflow-hidden shadow-md relative">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-[200px] object-cover"
            />

            <div className="absolute inset-0 bg-opacity-30 flex justify-end items-end p-4">
              <h3 className="font-medium text-right text-white text-lg">
                {place.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

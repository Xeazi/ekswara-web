// src/components/UpcomingCard.jsx
import React from "react";

const UpcomingCard = ({ date, image, location, title, time, price }) => {
    return (
        <div className="rounded-xl p-4 overflow-hidden bg-white shadow-md w-[250px] h-[380px] ">
        <div className="relative">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="absolute top-2 left-2 bg-green-800 text-white px-2 py-1 text-sm rounded-md">
            {date}
            </div>
        </div>
        <div className="p-4">
            <p className="text-xs text-gray-500">{location}</p>
            <h3 className="text-md font-semibold mb-2">{title}</h3>
            <div className="text-sm text-gray-600 flex justify-between mt-8">
                <div className="flex justify-between items-start gap-2  ">
                    <span>🕒 {time}</span>
                    <span className="font-semibold text-text">From {price}</span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default UpcomingCard;

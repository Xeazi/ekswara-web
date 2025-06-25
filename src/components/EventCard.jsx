import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export const EventCard = ({ event }) => {
  const isFree = event.price.toLowerCase() === "free";
  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={event.image}
        alt={event.title}
        className="w-full md:w-[270px] md:h-[270px] h-full object-cover flex-shrink-0"
      />
      <div className="p-5 flex flex-col justify-between flex-grow w-full">
        <div className="flex-grow mb-4">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
            {event.location}
          </p>
          <h3 className="text-xl lg:text-2xl font-bold text-text mb-2 hover:text-main transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-auto gap-4">
          <div className="text-sm text-text">
            <div className="flex items-center mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {event.dateDisplay}
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {event.time}
            </div>
          </div>{" "}
          <div className="text-left sm:text-right">
            {!isFree && <p className="text-xs text-text">From</p>}
            <p
              className={`text-xl font-semibold mb-2 ${
                isFree ? "text-text" : "text-gray-800"
              }`}>
              {event.price}
            </p>
            <Link
              to={`/ticket-reservation/${event.id}`}
              state={{ event: event }}>
              <Button
                text="Order Now"
                className="!bg-main hover:!bg-secondary !text-white !px-6 !py-2 !rounded-md !text-sm !font-medium w-full sm:w-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

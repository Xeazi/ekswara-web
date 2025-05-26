import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white shadow-lg py-4 w-full h-[72px] flex items-center justify-between px-4 md:px-8 sticky top-0 z-1">
      <div className="text-lg font-bold text-[var(--color-text)]">
        UrbanRayaJakarta
      </div>
      <nav className="flex gap-4 sm:gap-6 text-sm sm:text-base">
        <Link to="/" className="text-[var(--color-text-light)] hover:text-[var(--color-text)] px-2 py-1">
          Home
        </Link>
        <Link to="/destination" className="text-[var(--color-text-light)] hover:text-[var(--color-text)] px-2 py-1">
          Destination
        </Link>
        <Link to="/event" className="text-[var(--color-text-light)] hover:text-[var(--color-text)] px-2 py-1">
          Event
        </Link>
      </nav>
    </header>
  );
};

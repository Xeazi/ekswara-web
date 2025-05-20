import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
  <header className="bg-white shadow-lg py-4 w-full h-[88px] flex items-center justify-between px-8">
      <div className="text-lg font-bold text-[var(--color-text)]">UrbanRayaJakarta</div>
      <nav className="flex gap-6">
        <Link to="/" className="text-[var(--color-text-light)] hover:text-[var(--color-text)]">Home</Link>
        <Link to="/destination" className="text-[var(--color-text-light)] hover:text-[var(--color-text)]">Destination</Link>
        <Link to="/event" className="text-[var(--color-text-light)] hover:text-[var(--color-text)]">Event</Link>
      </nav>
    </header>
  )
}


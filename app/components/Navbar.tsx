"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50 bg-base-100 shadow">
        <div className="flex items-center justify-between px-6 h-16 relative">
          {/* Left: Logo */}
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              MyApp
            </Link>
          </div>

          {/* Right: Burger Icon (visually hidden when menu is open) */}
          <div className={`flex-none transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <button
              onClick={toggleMenu}
              className="btn btn-ghost btn-circle"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-base-100 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="btn btn-ghost btn-circle">
            ✕
          </button>
        </div>

        {/* Menu links */}
        <ul className="menu p-4 space-y-2">
          <li>
            <Link href="/coach" onClick={toggleMenu}>
              Coach
            </Link>
          </li>
          <li>
            <Link href="/sessions" onClick={toggleMenu}>
              Sessions
            </Link>
          </li>
          <li>
            <Link href="/profile" onClick={toggleMenu}>
              Profile
            </Link>
          </li>
          <li>
            <Link href="/logout" onClick={toggleMenu}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

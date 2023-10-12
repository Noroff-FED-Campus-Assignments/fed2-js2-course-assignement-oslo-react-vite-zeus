import { useState } from "react";
import { Link } from "@tanstack/react-router"; 

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-2 border-white border-b-blue-500">
        <div className="px-10 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-normal text-blue-500">
                Synapse Social
              </Link>
            </div>

            <div className="hidden space-x-10 md:flex">
              <Link to="/" className="text-lg text-gray-600 hover:text-blue-500">
                Home
              </Link>
              <Link to="/profile" className="text-lg text-gray-600 hover:text-blue-500">
                Profile
              </Link>
              <Link to="/profiles" className="text-lg text-gray-600 hover:text-blue-500">
                Profiles
              </Link>
              <Link to="/posts" className="text-lg text-gray-600 hover:text-blue-500">
                Posts
              </Link>
              <Link to="/login" className="text-lg text-gray-600 hover:text-blue-500">
                Login
              </Link>
              <input
                type="text"
                placeholder="Search"
                className="px-2 font-light border-2 border-blue-500 rounded-3xl"
              />
            </div>

            <div className="md:hidden">
              <button
                className="text-gray-600 hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="absolute z-10 w-full py-5 text-center bg-white border-2 border-white md:hidden border-b-blue-500">
          <Link to="/" className="block p-2 text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link to="/profile" className="block p-2 my-2 text-gray-600 hover:text-blue-500">
            Profile
          </Link>
          <Link to="/login" className="block p-2 my-2 text-gray-600 hover:text-blue-500">
            Login
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 border border-blue-500 rounded-3xl"
          />
        </div>
      )}
    </>
  );
}

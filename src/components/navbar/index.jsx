import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

            <div className="hidden space-x-10 lg:flex">
              <Link
                to="/profile"
                className="text-lg text-gray-600 hover:text-blue-500"
              >
                Profile
              </Link>
              <Link
                to="/profiles"
                className="text-lg text-gray-600 hover:text-blue-500"
              >
                Profiles
              </Link>
              <Link
                to="/login"
                className="text-lg text-gray-600 hover:text-blue-500"
              >
                Login
              </Link>
              <Link
                to="/"
                className="text-lg text-gray-600 hover:text-blue-500"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>

            <div className="lg:hidden">
              <button
                className="text-gray-600 hover:text-blue-500"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`absolute z-10 w-full py-5 text-center bg-white border-2 border-white lg:hidden border-b-blue-500 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/profile"
          className="block p-2 my-2 text-lg text-gray-600 hover:text-blue-500"
          onClick={toggleMobileMenu}
        >
          Profile
        </Link>
        <Link
          to="/profiles"
          className="block p-2 my-2 text-lg text-gray-600 hover:text-blue-500"
          onClick={toggleMobileMenu}
        >
          Profiles
        </Link>

        <Link
          to="/login"
          className="block p-2 my-2 text-lg text-gray-600 hover:text-blue-500"
          onClick={toggleMobileMenu}
        >
          Login
        </Link>
        <Link
          to="/"
          className="block p-2 my-2 text-lg text-gray-600 hover:text-blue-500"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
    </>
  );
}

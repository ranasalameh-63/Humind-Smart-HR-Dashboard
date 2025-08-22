import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Admin Dashboard", path: "/dashboard" },
  { name: "Performance", path: "/performance" },
  { name: "Trainings", path: "/trainings" },
  { name: "Payroll", path: "/payroll" },
  { name: "Churn Risk", path: "/churn" },
  { name: "Employee Profile", path: "/employeeProfile" },
  { name: "Employees Management", path: "/employeesManagement" },
  { name: "Tickets Page", path: "/ticketsPage" },
  { name: "Settings", path: "/settings" },
  { name: "Login", path: "/login" },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-md shadow-[#9B7EBD] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#9B7EBD] to-[#3B1E54] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-2xl font-bold text-[#3B1E54]">Humind</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between w-full ml-10">
            <div className="flex items-center space-x-2 whitespace-nowrap overflow-x-auto max-w-[70vw] pr-2">
              {links.map((link) => {
                if (link.name === "Login" || link.name === "Settings") return null;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? "bg-[#9B7EBD] text-white shadow-md"
                        : "text-[#3B1E54] hover:bg-[#9B7EBD]/10 hover:text-[#9B7EBD]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {/* Settings as icon */}
              <Link
                to="/settings"
                className={`p-2 rounded-md hover:bg-[#9B7EBD]/10 text-[#3B1E54] hover:text-[#9B7EBD] ${
                  location.pathname === "/settings" ? "bg-[#9B7EBD] text-white" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m0 14v1m8.485-8.485h-1M4.515 12h-1m15.364-4.95l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              </Link>

              {/* Login as button */}
              <Link
                to="/login"
                className="ml-2 px-4 py-2 rounded-full bg-[#3B1E54] text-white font-medium text-sm shadow hover:bg-[#9B7EBD] transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#3B1E54] hover:text-[#9B7EBD] hover:bg-[#9B7EBD]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#9B7EBD] transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? "bg-[#9B7EBD] text-white shadow-md"
                  : "text-[#3B1E54] hover:bg-[#9B7EBD]/10 hover:text-[#9B7EBD]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
}

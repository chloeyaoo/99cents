import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a token in localStorage to determine authentication status
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    // Use the handleLogout function passed from App.js
    handleLogout();
    setIsAuthenticated(false);
    setIsOpen(false); // Close the navbar after logout
  };

  return (
    <nav className="bg-blue-500 p-4 fixed w-full top-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navbar Logo */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition-all">
          Appreciation App
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden" onClick={toggleNavbar}>
          {isOpen ? <FaTimes className="text-white" size={28} /> : <FaBars className="text-white" size={28} />}
        </div>

        {/* Navbar Links */}
        <ul
          className={`lg:flex lg:items-center space-x-6 absolute lg:relative top-16 lg:top-auto right-0 lg:right-auto w-full lg:w-auto bg-blue-500 lg:bg-transparent p-4 lg:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {isAuthenticated ? (
            <>
              <li className="my-4 lg:my-0">
                <Link
                  to="/send"
                  className="nav-link text-white hover:text-blue-200 transition-all"
                  onClick={() => setIsOpen(false)} // Close the menu after clicking a link
                >
                  Send Appreciation
                </Link>
              </li>
              <li className="my-4 lg:my-0">
                <Link
                  to="/history"
                  className="nav-link text-white hover:text-blue-200 transition-all"
                  onClick={() => setIsOpen(false)} // Close the menu after clicking a link
                >
                  Activity History
                </Link>
              </li>
              <li className="my-4 lg:my-0">
                <Link
                  to="/leaderboard"
                  className="nav-link text-white hover:text-blue-200 transition-all"
                  onClick={() => setIsOpen(false)} // Close the menu after clicking a link
                >
                  Leaderboards
                </Link>
              </li>
              <li className="my-4 lg:my-0">
                <Link
                  to="/analytics"
                  className="nav-link text-white hover:text-blue-200 transition-all"
                  onClick={() => setIsOpen(false)} // Close the menu after clicking a link
                >
                  Analytics
                </Link>
              </li>
              <li className="my-4 lg:my-0">
                <button
                  onClick={handleLogoutClick}
                  className="nav-link text-white hover:text-red-400 transition-all"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="my-4 lg:my-0">
                <Link
                  to="/login"
                  className="nav-link text-white hover:text-blue-200 transition-all"
                  onClick={() => setIsOpen(false)} // Close the menu after clicking a link
                >
                  Login
                </Link>
              </li>
              <li className="my-4 lg:my-0">
                <Link
                  to="/register"
                  className="nav-link text-white hover:text-blue-200 transition-all"
                  onClick={() => setIsOpen(false)} // Close the menu after clicking a link
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

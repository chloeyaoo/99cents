import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear the localStorage to logout
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-500 p-4 fixed w-full top-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navbar Logo */}
        <Link to="/" className="text-white text-2xl font-bold">Appreciation App</Link>
        
        {/* Hamburger Menu Icon */}
        <div className="lg:hidden" onClick={toggleNavbar}>
          {isOpen ? <FaTimes className="text-white" size={28} /> : <FaBars className="text-white" size={28} />}
        </div>

        {/* Navbar Links */}
        <ul className={`lg:flex lg:items-center space-x-6 absolute lg:relative top-16 lg:top-auto right-0 lg:right-auto w-full lg:w-auto bg-blue-500 lg:bg-transparent p-4 lg:p-0 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
          <li className="my-4 lg:my-0">
            <Link to="/send" className="nav-link">Send Appreciation</Link>
          </li>
          <li className="my-4 lg:my-0">
            <Link to="/history" className="nav-link">Activity History</Link>
          </li>
          <li className="my-4 lg:my-0">
            <Link to="/leaderboard" className="nav-link">Leaderboards</Link>
          </li>
          <li className="my-4 lg:my-0">
            <Link to="/analytics" className="nav-link">Analytics</Link>
          </li>
          <li className="my-4 lg:my-0">
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


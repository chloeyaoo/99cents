import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-500 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Appreciation App</h1>
        <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
        </div>
        <ul className={`lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'}`}>
          {!isAuthenticated ? (
            <>
              <li className="m-4">
                <Link to="/login">
                  <Button variant="outline" className="text-white">Login</Button>
                </Link>
              </li>
              <li className="m-4">
                <Link to="/register">
                  <Button variant="outline" className="text-white">Register</Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="m-4">
                <Link to="/send">
                  <Button className="text-white">Send Appreciation</Button>
                </Link>
              </li>
              <li className="m-4">
                <Link to="/history">
                  <Button className="text-white">Activity History</Button>
                </Link>
              </li>
              <li className="m-4">
                <Link to="/leaderboard">
                  <Button className="text-white">Leaderboards</Button>
                </Link>
              </li>
              <li className="m-4">
                <Link to="/analytics">
                  <Button className="text-white">Analytics</Button>
                </Link>
              </li>
              <li className="m-4">
                <Button onClick={handleLogout} variant="outline" className="text-white">
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

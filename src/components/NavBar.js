import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    onLogout(); // Reset the authentication state in App component
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Appreciation App</h1>
        <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
        </div>
        <ul className={`lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <li className="m-4"><Link to="/send" className="text-white">Send Appreciation</Link></li>
          <li className="m-4"><Link to="/history" className="text-white">Activity History</Link></li>
          <li className="m-4"><Link to="/leaderboard" className="text-white">Leaderboards</Link></li>
          <li className="m-4"><Link to="/analytics" className="text-white">Analytics</Link></li>
          <li className="m-4">
            <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

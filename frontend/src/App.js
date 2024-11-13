import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initGA, logPageView } from './analytics'; // Import the analytics functions
import Navbar from './components/Navbar';
import SendAppreciation from './components/SendAppreciation';
import ActivityHistory from './components/ActivityHistory';
import Leaderboard from './components/Leaderboard';
import Analytics from './components/Analytics';
import Login from './components/Login';
import Register from './components/Register';

function TrackingWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname); // Log the page view on every route change
  }, [location]);

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initGA(); // Initialize Google Analytics when the app starts
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <Router>
      <TrackingWrapper>
        {isAuthenticated && <Navbar handleLogout={handleLogout} />}
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/history" />} />
              <Route path="/send" element={<SendAppreciation />} />
              <Route path="/history" element={<ActivityHistory />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/history" replace />} />
            </>
          )}
        </Routes>
      </TrackingWrapper>
    </Router>
  );
}

export default App;

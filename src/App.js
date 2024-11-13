import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { initGA, logPageView } from './analytics'; // Import the analytics functions
import Navbar from './components/Navbar';
import SendAppreciation from './components/SendAppreciation';
import ActivityHistory from './components/ActivityHistory';
import Leaderboard from './components/Leaderboard';
import Analytics from './components/Analytics';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  useEffect(() => {
    initGA(); // Initialize Google Analytics when the app starts
  }, []);

  return (
    <Router>
      <TrackingWrapper>
        {/* Use TrackingWrapper to track page views */}
        <Navbar />
        <Routes>
          <Route path="/send" element={<SendAppreciation />} />
          <Route path="/history" element={<ActivityHistory />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </TrackingWrapper>
    </Router>
  );
}

export default App;

// Create a wrapper component to handle page tracking
function TrackingWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname;
    logPageView(pagePath);
  }, [location]);

  return children;
}

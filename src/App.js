import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SendAppreciation from './components/SendAppreciation';
import ActivityHistory from './components/ActivityHistory';
import Leaderboard from './components/Leaderboard';
import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/send" element={<SendAppreciation />} />
        <Route path="/history" element={<ActivityHistory />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
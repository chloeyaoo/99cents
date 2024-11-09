import { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/appreciation/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        alert('Error fetching leaderboard');
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ul>
          {leaderboard.map((user, index) => (
            <li key={index} className="mb-2">
              <strong>{user.username}</strong>: {user.appreciation_count} appreciations sent
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
import { useState, useEffect } from 'react';
import axios from 'axios';

function ActivityHistory() {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/api/appreciation/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching appreciation history:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">Activity History</h1>
      {history.length > 0 ? (
        <ul>
          {history.map((entry) => (
            <li key={entry.id} className="mb-4 bg-white shadow-md rounded p-4">
              <p><strong>From User ID:</strong> {entry.sender_id}</p>
              <p><strong>To User ID:</strong> {entry.recipient_id}</p>
              <p><strong>Amount:</strong> ${entry.amount}</p>
              <p><strong>Message:</strong> {entry.message}</p>
              <p><strong>Date:</strong> {new Date(entry.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appreciation history available.</p>
      )}
    </div>
  );
}

export default ActivityHistory;

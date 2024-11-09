import { useEffect, useState } from 'react';
import axios from 'axios';

function ActivityHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = 1; // Replace with actual user ID from context/auth
        const response = await axios.get(`/api/appreciation/history/${userId}`);
        setHistory(response.data);
      } catch (error) {
        alert('Error fetching history');
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold mb-4">Activity History</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            <p><strong>Message:</strong> {item.message}</p>
            <p><strong>Amount:</strong> ${item.amount}</p>
            <p><strong>Date:</strong> {new Date(item.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityHistory;
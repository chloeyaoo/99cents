import { useEffect, useState } from 'react';
import axios from 'axios';

function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalAmount: 0,
    totalMessages: 0,
    mostActiveHours: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/appreciation/analytics');
        setAnalytics(response.data);
      } catch (error) {
        alert('Error fetching analytics');
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p><strong>Total Amount Sent:</strong> ${analytics.totalAmount}</p>
        <p><strong>Total Messages Sent:</strong> {analytics.totalMessages}</p>
        <h3 className="text-xl font-bold mt-4">Most Active Hours</h3>
        <ul>
          {analytics.mostActiveHours.map((hour, index) => (
            <li key={index}>Hour {hour.hour}: {hour.count} messages</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import { FiArrowUpRight, FiArrowDownLeft, FiMessageCircle } from 'react-icons/fi';

function ActivityHistory() {
  const [history, setHistory] = useState([]);
  const [userMap, setUserMap] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch activity history
        const response = await axios.get(`http://localhost:5001/api/appreciation/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);

        // Fetch user details to get usernames
        const usersResponse = await axios.get('http://localhost:5001/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Create a map of userId to username
        const userMap = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
        setUserMap(userMap);
      } catch (error) {
        console.error('Error fetching appreciation history or user data:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  // Split history into received and sent appreciations
  const receivedAppreciations = history.filter(entry => entry.recipient_id === parseInt(userId));
  const sentAppreciations = history.filter(entry => entry.sender_id === parseInt(userId));

  // Function to convert string to proper casing
  const toProperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="container mx-auto mt-20 p-4 space-y-8">
      {/* Card for Received Appreciations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6">Received Appreciations</CardTitle>
        </CardHeader>
        <CardContent>
          {receivedAppreciations.length > 0 ? (
            <div className="space-y-4">
              {receivedAppreciations.map((entry) => (
                <div key={entry.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <FiArrowDownLeft className="text-green-500" />
                      <p className="font-medium">From: {toProperCase(userMap[entry.sender_id] || 'Unknown')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium text-green-600">${Number(entry.amount).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{entry.created_at}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FiMessageCircle size={18} className="text-gray-400 mt-1" />
                      <p className="text-gray-700">{entry.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No received appreciations available.</p>
          )}
        </CardContent>
      </Card>

      {/* Card for Sent Appreciations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6">Sent Appreciations</CardTitle>
        </CardHeader>
        <CardContent>
          {sentAppreciations.length > 0 ? (
            <div className="space-y-4">
              {sentAppreciations.map((entry) => (
                <div key={entry.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <FiArrowUpRight className="text-blue-500" />
                      <p className="font-medium">To: {toProperCase(userMap[entry.recipient_id] || 'Unknown')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium text-blue-600">${Number(entry.amount).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{entry.created_at}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FiMessageCircle size={18} className="text-gray-400 mt-1" />
                      <p className="text-gray-700">{entry.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No sent appreciations available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ActivityHistory;

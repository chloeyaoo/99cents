import { useState, useEffect } from 'react';
import axios from 'axios';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import { FiArrowUpRight, FiArrowDownLeft, FiMessageCircle, FiZap, FiAward } from 'react-icons/fi';
import API_BASE_URL from '../apiConfig';

function ActivityHistory() {
  const [history, setHistory] = useState([]);
  const [userMap, setUserMap] = useState({});
  const userId = localStorage.getItem('userId');

  // Pagination states
  const [receivedPage, setReceivedPage] = useState(1);
  const [sentPage, setSentPage] = useState(1);
  const messagesPerPage = 5;

  // Streak states
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch activity history
        const response = await axios.get(`${API_BASE_URL}/api/appreciation/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);

        // Fetch user details to get usernames
        const usersResponse = await axios.get(`${API_BASE_URL}/api/users`, {
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

        // Calculate streaks based on sent appreciations
        calculateStreaks(response.data);
      } catch (error) {
        console.error('Error fetching appreciation history or user data:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  const calculateStreaks = (data) => {
    const sentAppreciations = data.filter(entry => entry.sender_id === parseInt(userId));
    const sortedDates = sentAppreciations
      .map(entry => new Date(entry.created_at).toDateString())
      .sort((a, b) => new Date(a) - new Date(b));

    let currentStreakCount = 0;
    let maxStreakCount = 0;
    let previousDate = null;

    sortedDates.forEach(dateString => {
      const date = new Date(dateString);
      if (previousDate) {
        const diffDays = (date - previousDate) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          currentStreakCount += 1;
        } else if (diffDays > 1) {
          maxStreakCount = Math.max(maxStreakCount, currentStreakCount);
          currentStreakCount = 1; // Reset streak count
        }
      } else {
        currentStreakCount = 1; // Start counting streak
      }
      previousDate = date;
    });

    // Final streak check
    maxStreakCount = Math.max(maxStreakCount, currentStreakCount);

    setCurrentStreak(currentStreakCount);
    setLongestStreak(maxStreakCount);
  };

  // Split history into received and sent appreciations
  const receivedAppreciations = history.filter(entry => entry.recipient_id === parseInt(userId));
  const sentAppreciations = history.filter(entry => entry.sender_id === parseInt(userId));

  // Pagination handlers
  const getPaginatedData = (data, page) => {
    const startIndex = (page - 1) * messagesPerPage;
    return data.slice(startIndex, startIndex + messagesPerPage);
  };

  const toProperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="container mx-auto mt-20 p-4 space-y-8">
      {/* Streak Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <FiZap className="text-orange-500" />
              <h3 className="font-semibold">Current Streak</h3>
            </div>
            <p className="text-3xl font-bold text-orange-600">{currentStreak} days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <FiAward className="text-purple-500" />
              <h3 className="font-semibold">Longest Streak</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">{longestStreak} days</p>
          </CardContent>
        </Card>
      </div>

      {/* Card for Received Appreciations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6">Received Appreciations</CardTitle>
        </CardHeader>
        <CardContent>
          {receivedAppreciations.length > 0 ? (
            <div className="space-y-4">
              {getPaginatedData(receivedAppreciations, receivedPage).map((entry) => (
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
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setReceivedPage(Math.max(receivedPage - 1, 1))}
                  disabled={receivedPage === 1}
                  className="text-blue-500 disabled:text-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={() => setReceivedPage(receivedPage + 1)}
                  disabled={receivedPage * messagesPerPage >= receivedAppreciations.length}
                  className="text-blue-500 disabled:text-gray-400"
                >
                  Next
                </button>
              </div>
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
              {getPaginatedData(sentAppreciations, sentPage).map((entry) => (
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
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setSentPage(Math.max(sentPage - 1, 1))}
                  disabled={sentPage === 1}
                  className="text-blue-500 disabled:text-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSentPage(sentPage + 1)}
                  disabled={sentPage * messagesPerPage >= sentAppreciations.length}
                  className="text-blue-500 disabled:text-gray-400"
                >
                  Next
                </button>
              </div>
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

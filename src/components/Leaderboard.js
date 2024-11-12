import { useState, useEffect } from 'react';
import axios from 'axios';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Leaderboard() {
  const [userStats, setUserStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/leaderboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserStats(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setError('Failed to load leaderboard data. Please try again later.');
      }
    };

    fetchLeaderboardData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Prepare data for charts
  const usernames = userStats.map(user => user.username);

//   // Rest of the chart preparation code remains the same...
// }


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function Leaderboard() {
//   const [userStats, setUserStats] = useState([]);
  
//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5001/api/leaderboard', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUserStats(response.data);
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);

//   // Prepare data for charts
//   const usernames = userStats.map(user => user.username);
  
  // Total Messages Sent
  const totalMessagesData = {
    labels: usernames,
    datasets: [
      {
        label: 'Total Messages Sent',
        data: userStats.map(user => user.total_messages),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Total Amount Sent
  const totalAmountData = {
    labels: usernames,
    datasets: [
      {
        label: 'Total Amount Sent ($)',
        data: userStats.map(user => user.total_amount),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Longest Streaks
  const longestStreaksData = {
    labels: usernames,
    datasets: [
      {
        label: 'Longest Streak (Days)',
        data: userStats.map(user => user.longest_streak),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-20 p-4 space-y-8">
      {/* Card for Total Messages Sent */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6">Total Messages Sent by User</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar 
            data={totalMessagesData} 
            options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Total Messages Sent by User' },
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Card for Total Amount Sent */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6">Total Amount Sent by User</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar 
            data={totalAmountData} 
            options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Total Amount Sent by User' },
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Card for Longest Streaks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6">Longest Streaks by User</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar 
            data={longestStreaksData} 
            options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Longest Streaks by User' },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Leaderboard;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any existing error state

    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email,
        password,
      });

      if (response.data.token && response.data.userId) {
        // Store both the token and userId in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);

        // Navigate to the activity history page after successful login
        navigate('/history');

        // Reload the page to ensure the Navbar state is refreshed
        window.location.reload();
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-6">
      {/* Hero Banner Section */}
      <div className="flex flex-col items-start text-white space-y-6 mb-8 lg:mb-0 lg:mr-16 max-w-lg">
        <h1 className="text-5xl font-bold">99c Daily Gratitude</h1>
        <p className="text-lg lg:text-xl">
          Your daily commitment to send an appreciation message to someone you're grateful for.
        </p>
        <p className="text-md lg:text-lg">
          A small token of appreciation can make a big difference. Spread gratitude every day, and see positivity multiply.
        </p>
      </div>

      {/* Login Form Section */}
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>
        <p className="text-gray-600 mt-6 text-center">
          Don't have an account? <a href="/register" className="text-blue-600 font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

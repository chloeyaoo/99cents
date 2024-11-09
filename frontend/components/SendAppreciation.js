import { useState } from 'react';
import axios from 'axios';

function SendAppreciation() {
  const [recipientUsername, setRecipientUsername] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/appreciation/send', {
        recipient_username: recipientUsername,
        amount,
        message,
      });
      alert('Appreciation sent!');
    } catch (error) {
      alert('Error sending appreciation');
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Recipient Username</label>
          <input value={recipientUsername} onChange={(e) => setRecipientUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="text" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount (max $0.99)</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="number" max="0.99" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
      </form>
    </div>
  );
}

export default SendAppreciation;
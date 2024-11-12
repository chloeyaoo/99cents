import { useState } from 'react';
import axios from 'axios';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { FiHeart } from 'react-icons/fi';

function SendAppreciation() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0.99);
  const userId = localStorage.getItem('userId');

  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5001/api/appreciation/send',
        {
          sender_id: userId,
          recipient_username: recipient,
          amount,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Appreciation sent successfully!');
      setRecipient('');
      setMessage('');
    } catch (error) {
      console.error('Error sending appreciation:', error);
      alert('Failed to send appreciation. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiHeart className="text-red-500" />
            Send Appreciation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Recipient Username</label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient's username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a personal note of appreciation..."
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
              <Input
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                type="number"
                min="0.01"
                max="0.99"
                step="0.01"
                required
              />
            </div>
            <Button onClick={handleSend} className="w-full mt-4">
              Send Appreciation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SendAppreciation;

import { useState } from 'react';
import axios from 'axios';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { FiHeart } from 'react-icons/fi';
import Modal from './Modal'; // Import the Modal component
import API_BASE_URL from '../apiConfig';

function SendAppreciation() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0.99);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/api/appreciation/send`,
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
      // Set modal state for success
      setModalTitle('Success');
      setModalMessage('Appreciation sent successfully!');
      setIsModalOpen(true);
      // Reset fields
      setRecipient('');
      setMessage('');
    } catch (error) {
      console.error('Error sending appreciation:', error);
      // Set modal state for error
      setModalTitle('Error');
      setModalMessage('Failed to send appreciation. Please try again.');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}

export default SendAppreciation;

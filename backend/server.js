const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('email:', email);
    console.log('user:', user);
    if (user.rows.length > 0) {
      console.log('Password provided for login:', password);
      console.log('Stored hashed password:', user.rows[0].password);
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (validPassword) {
        const token = jwt.sign({ id: user.rows[0].id }, 'secretkey');
        res.json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

app.post('/api/appreciation/send', async (req, res) => {
  const { sender_id, recipient_username, amount, message } = req.body;
  try {
    if (amount > 0.99) return res.status(400).send('Amount exceeds limit');
    const recipient = await pool.query('SELECT id FROM users WHERE username = $1', [recipient_username]);
    if (recipient.rows.length === 0) return res.status(404).send('Recipient not found');

    await pool.query(
      'INSERT INTO appreciation (sender_id, recipient_id, amount, message, created_at) VALUES ($1, $2, $3, $4, NOW())',
      [sender_id, recipient.rows[0].id, amount, message]
    );
    res.status(201).send('Appreciation sent');
  } catch (error) {
    res.status(500).send('Error sending appreciation');
  }
});

app.get('/api/appreciation/history/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await pool.query(
      'SELECT * FROM appreciation WHERE sender_id = $1 OR recipient_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(history.rows);
  } catch (error) {
    res.status(500).send('Error fetching appreciation history');
  }
});

app.get('/api/appreciation/leaderboard', async (req, res) => {
  try {
    const leaderboard = await pool.query(
      'SELECT username, COUNT(*) as appreciation_count FROM users u JOIN appreciation a ON u.id = a.sender_id GROUP BY username ORDER BY appreciation_count DESC LIMIT 10'
    );
    res.json(leaderboard.rows);
  } catch (error) {
    res.status(500).send('Error fetching leaderboard');
  }
});

app.get('/api/appreciation/analytics', async (req, res) => {
  try {
    const totalAmount = await pool.query('SELECT SUM(amount) as total_amount FROM appreciation');
    const totalMessages = await pool.query('SELECT COUNT(*) as total_messages FROM appreciation');
    const mostActiveHours = await pool.query(
      `SELECT EXTRACT(HOUR FROM created_at) as hour, COUNT(*) as count 
       FROM appreciation GROUP BY hour ORDER BY count DESC LIMIT 5`
    );

    res.json({
      totalAmount: totalAmount.rows[0].total_amount,
      totalMessages: totalMessages.rows[0].total_messages,
      mostActiveHours: mostActiveHours.rows,
    });
  } catch (error) {
    res.status(500).send('Error fetching analytics');
  }
});
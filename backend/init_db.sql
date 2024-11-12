CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE appreciation (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    recipient_id INTEGER REFERENCES users(id),
    amount DECIMAL(3, 2) NOT NULL CHECK (amount <= 0.99),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO appreciation (sender_id, recipient_id, amount, message, created_at) VALUES
  -- User 1 (John) appreciation messages for streak scenario
  (1, 2, 0.50, 'Thanks for your help, Mary!', '2024-10-01 10:00:00'),
  (1, 3, 0.75, 'Great job on the project, Paul!', '2024-10-02 11:00:00'),
  (1, 4, 0.25, 'Appreciate your effort, Lisa!', '2024-10-03 09:30:00'),
  (1, 5, 0.80, 'Well done, Steve!', '2024-10-04 08:45:00'),
  (1, 6, 0.99, 'Keep up the good work, Susan!', '2024-10-05 12:15:00'), -- 5-day current streak
  (1, 7, 0.45, 'Awesome support, Mike!', '2024-09-15 14:20:00'),
  (1, 8, 0.30, 'You are fantastic, Anna!', '2024-09-16 10:30:00'),
  (1, 9, 0.60, 'Great collaboration, David!', '2024-09-17 16:00:00'),
  (1, 10, 0.50, 'Thanks for the quick help, Julia!', '2024-09-18 15:45:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-19 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-20 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-21 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-22 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-23 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-24 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-25 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-26 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-27 13:00:00'),
  (1, 2, 0.55, 'Amazing work, Mary!', '2024-09-28 13:00:00'), -- 14-day longest streak ends here

  -- User 2 (Mary) appreciation messages
  (2, 1, 0.60, 'Thank you for the support, John!', '2024-10-07 09:00:00'),
  (2, 3, 0.99, 'You did amazing, Paul!', '2024-10-08 10:45:00'),
  (2, 4, 0.25, 'Great teamwork, Lisa!', '2024-10-09 08:30:00'),
  (2, 5, 0.75, 'Nice work, Steve!', '2024-10-10 11:15:00'),
  (2, 6, 0.99, 'Fantastic effort, Susan!', '2024-10-11 14:00:00'),

  -- User 3 (Paul) appreciation messages
  (3, 1, 0.70, 'Much appreciated, John!', '2024-10-05 10:00:00'),
  (3, 2, 0.40, 'You rock, Mary!', '2024-10-06 12:30:00'),
  (3, 4, 0.25, 'Awesome work, Lisa!', '2024-10-07 09:45:00'),
  (3, 5, 0.75, 'Superb, Steve!', '2024-10-08 13:00:00'),
  (3, 6, 0.99, 'Excellent, Susan!', '2024-10-09 15:30:00'),

  -- User 4 (Lisa) appreciation messages
  (4, 1, 0.50, 'Great help, John!', '2024-10-02 11:00:00'),
  (4, 2, 0.99, 'Wonderful job, Mary!', '2024-10-03 14:00:00'),
  (4, 3, 0.25, 'Thanks a lot, Paul!', '2024-10-04 10:15:00'),
  (4, 5, 0.75, 'You are amazing, Steve!', '2024-10-05 13:30:00'),
  (4, 6, 0.99, 'Keep it up, Susan!', '2024-10-06 09:00:00'),

  -- User 5 (Steve) appreciation messages
  (5, 1, 0.50, 'Fantastic, John!', '2024-09-20 08:45:00'),
  (5, 2, 0.99, 'Could not have done it without you, Mary!', '2024-09-21 10:00:00'),
  (5, 3, 0.25, 'You are the best, Paul!', '2024-09-22 12:00:00'),
  (5, 4, 0.75, 'Super helpful, Lisa!', '2024-09-23 14:15:00'),
  (5, 6, 0.99, 'Awesome effort, Susan!', '2024-09-24 16:30:00'),

  -- User 6 (Susan) appreciation messages
  (6, 1, 0.60, 'Great work, John!', '2024-10-01 09:30:00'),
  (6, 2, 0.80, 'Thank you so much, Mary!', '2024-10-02 10:45:00'),
  (6, 3, 0.70, 'Impressive, Paul!', '2024-10-03 14:20:00'),
  (6, 4, 0.65, 'Great effort, Lisa!', '2024-10-04 13:00:00'),
  (6, 5, 0.85, 'Fantastic work, Steve!', '2024-10-05 15:30:00'),

  -- User 7 (Mike) appreciation messages
  (7, 1, 0.50, 'Impressive work, John!', '2024-10-01 08:00:00'),
  (7, 3, 0.85, 'Really appreciate it, Paul!', '2024-10-02 11:30:00'),
  (7, 4, 0.45, 'Thank you, Lisa!', '2024-10-03 14:45:00'),
  (7, 5, 0.95, 'Great job, Steve!', '2024-10-04 16:00:00'),
  (7, 6, 0.70, 'Well done, Susan!', '2024-10-05 10:30:00'),

  -- User 8 (Anna) appreciation messages
  (8, 2, 0.95, 'Amazing job, Mary!', '2024-09-29 12:00:00'),
  (8, 4, 0.50, 'Thanks for the help, Lisa!', '2024-09-30 13:45:00'),
  (8, 5, 0.40, 'Great contribution, Steve!', '2024-10-01 10:15:00'),
  (8, 6, 0.70, 'Well done, Susan!', '2024-10-02 11:00:00'),
  (8, 7, 0.60, 'Great effort, Mike!', '2024-10-03 14:30:00'),

  -- User 9 (David) appreciation messages
  (9, 1, 0.60, 'Nice effort, John!', '2024-10-04 08:45:00'),
  (9, 2, 0.55, 'You are fantastic, Mary!', '2024-10-05 10:00:00'),
  (9, 3, 0.45, 'Wonderful work, Paul!', '2024-10-06 12:15:00'),
  (9, 4, 0.75, 'Awesome, Lisa!', '2024-10-07 09:30:00'),
  (9, 5, 0.85, 'Great, Steve!', '2024-10-08 11:45:00'),

  -- User 10 (Julia) appreciation messages
  (10, 1, 0.60, 'Well done, John!', '2024-10-01 09:00:00'),
  (10, 2, 0.75, 'Amazing, Mary!', '2024-10-02 11:00:00'),
  (10, 3, 0.50, 'Great job, Paul!', '2024-10-03 10:45:00'),
  (10, 4, 0.65, 'Keep it up, Lisa!', '2024-10-04 14:00:00'),
  (10, 5, 0.95, 'Excellent work, Steve!', '2024-10-05 16:00:00');
(async () => {
    const bcrypt = require('bcrypt');
    const pool = require('./db');

    const users = [
        { username: 'john', email: 'john@example.com', password: 'password1' },
        { username: 'mary', email: 'mary@example.com', password: 'password2' },
        { username: 'paul', email: 'paul@example.com', password: 'password3' },
        { username: 'lisa', email: 'lisa@example.com', password: 'password4' },
        { username: 'steve', email: 'steve@example.com', password: 'password5' },
        { username: 'susan', email: 'susan@example.com', password: 'password6' },
        { username: 'mike', email: 'mike@example.com', password: 'password7' },
        { username: 'anna', email: 'anna@example.com', password: 'password8' },
        { username: 'david', email: 'david@example.com', password: 'password9' },
        { username: 'julia', email: 'julia@example.com', password: 'password10' }
    ];

    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [user.username, user.email, hashedPassword]);
    }

    console.log('User seeding completed with hashed passwords');
    process.exit();
})();

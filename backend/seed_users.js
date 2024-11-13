(async () => {
    const bcrypt = require('bcryptjs');
    const pool = require('./db');

    const users = [
        { username: 'John', email: 'john@example.com', password: 'password1' },
        { username: 'Mary', email: 'mary@example.com', password: 'password2' },
        { username: 'Paul', email: 'paul@example.com', password: 'password3' },
        { username: 'Lisa', email: 'lisa@example.com', password: 'password4' },
        { username: 'Steve', email: 'steve@example.com', password: 'password5' },
        { username: 'Susan', email: 'susan@example.com', password: 'password6' },
        { username: 'Mike', email: 'mike@example.com', password: 'password7' },
        { username: 'Anna', email: 'anna@example.com', password: 'password8' },
        { username: 'David', email: 'david@example.com', password: 'password9' },
        { username: 'Julia', email: 'julia@example.com', password: 'password10' }
    ];

    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [user.username, user.email, hashedPassword]);
    }

    console.log('User seeding completed with hashed passwords');
    process.exit();
})();

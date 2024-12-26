
const mysql = require('mysql2');

// Initialize connection
const connectDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Relational@23',
    database: 'fvrtmovie_db', // Switch directly to the target database
});

// Connect to the database
connectDb.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected!');

    // Create the table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS favourites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      )
    `;

    connectDb.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table created or already exists.');
    });
});

module.exports = connectDb;

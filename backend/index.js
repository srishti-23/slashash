const express = require("express");
const bodyParser = require("body-parser");
const router = require('./routes/fvrtmovie');
const cors = require("cors");
const mysql = require('mysql2');

const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',  
    methods: 'GET,POST',  
    allowedHeaders: 'Content-Type',  
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to entertainment zone" });
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Relational@23',  
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server!');

    // Create database if not exists
   
    connection.changeUser({ database: 'fvrtmovie_db' }, (err) => {
      if (err) {
        console.error('Error switching to database:', err);
        return;
      }
      console.log('Switched to database: fvrtmovie_db');
      
      // Create the table if not exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS favourites (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          release_year INT
         
        );
      `;
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table created or already exists.');
      });
      connection.query('SHOW TABLES', (err, results) => {
        if (err) {
          console.error('Error fetching tables:', err);
          return;
        }
        console.log('Tables in fvrtmovie_db:', results);
      })
      connection.query('SELECT * FROM favourites', (err, results) => {
        if (err) {
          console.error('Error fetching data from favourites table:', err);
          return;
        }
    
        // Log the results to the console
        console.log('Content of favourites table:', results);})
        
    });
   

 
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

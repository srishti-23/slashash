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

        // Check if column 'Type' exists
        const checkColumnQuery = `
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'favourites' AND COLUMN_NAME = 'Type';
        `;
        connection.query(checkColumnQuery, (err, results) => {
            if (err) {
                console.error('Error checking column existence for Type:', err);
                return;
            }
            
            if (results.length === 0) {
                // Add the 'Type' column if it doesn't exist
                const alterTableQuery = `
                    ALTER TABLE favourites 
                    ADD COLUMN Type VARCHAR(255);
                `;
                connection.query(alterTableQuery, (err) => {
                    if (err) {
                        console.error('Error adding column Type:', err);
                        return;
                    }
                    console.log('Column "Type" has been added to favourites table.');
                });
            } else {
                console.log('Column "Type" already exists.');
            }
        });

        // Check if column 'Year' exists
        const checkYearColumnQuery = `
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'favourites' AND COLUMN_NAME = 'Year';
        `;
        connection.query(checkYearColumnQuery, (err, results) => {
            if (err) {
                console.error('Error checking column existence for Year:', err);
                return;
            }

            if (results.length === 0) {
                // Add the 'Year' column if it doesn't exist
                const alterYearColumnQuery = `
                    ALTER TABLE favourites 
                    ADD COLUMN Year INT;
                `;
                connection.query(alterYearColumnQuery, (err) => {
                    if (err) {
                        console.error('Error adding column Year:', err);
                        return;
                    }
                    console.log('Column "Year" has been added to favourites table.');
                });
            } else {
                console.log('Column "Year" already exists.');
            }
        });

        connection.query('SHOW TABLES', (err, results) => {
            if (err) {
                console.error('Error fetching tables:', err);
                return;
            }
            console.log('Tables in fvrtmovie_db:', results);
        });

        connection.query('SELECT * FROM favourites', (err, results) => {
            if (err) {
                console.error('Error fetching data from favourites table:', err);
                return;
            }
            // Log the results to the console
            console.log('Content of favourites table:', results);
        });
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

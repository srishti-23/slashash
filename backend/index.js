const express = require("express");
const bodyParser = require("body-parser");
const router=require('./routes/fvrtmovie')
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
app.use(bodyParser);
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ mesage: "Welcome to entertainment zone" });
});



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Relational@23',  
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL server!');

  // Create the database (if it doesn't exist)
  const createDbQuery = 'CREATE DATABASE IF NOT EXISTS fvrtmovie_db';

  connection.query(createDbQuery, (err, results) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists:', results);


    connection.changeUser({ database: 'fvrtmovie_db' }, (err) => {
      if (err) {
        console.error('Error changing to the new database:', err);
        return;
      }
      console.log('Switched to database: fvrtmovie_db');
      
     
    });
  });
});

  
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

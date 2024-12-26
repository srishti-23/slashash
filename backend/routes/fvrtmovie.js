const express= require("express")
const mysql = require('mysql2');
const router = express.Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Relational@23',  
  database: 'fvrtmovie_db'
});

router.post('/favourites', (req, res) => {
  const { userId, Title, Type, Year } = req.body;

  if (!userId || !Title) {
    return res.status(400).json({ message: 'User ID and Title are required' });
  }

  const query = `INSERT INTO favourites (user_id, Title, Type, \`Year\`) VALUES (?, ?, ?, ?)`;

  connection.query(query, [userId, Title, Type, Year], (err, results) => {
    if (err) {
      console.error('Error adding to favourites:', err);
      return res.status(500).json({ message: 'Failed to add favourite', error: err.message });
    }

    res.status(201).json({ message: 'Favourite added successfully', favouriteId: results.insertId });
  });
});




router.get('/favourites/:userId?', (req, res) => {
  const userId = req.params.userId || req.query.userId; // Check both params and query
  console.log(userId);

  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  const query = `SELECT * FROM favourites WHERE user_id = ?`;

  connection.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Error fetching favourites:', err);
          return res.status(500).json({ message: 'Failed to fetch favourites', error: err.message });
      }

      res.status(200).json({ favourites: results });
  });
});



  
module.exports=router
  
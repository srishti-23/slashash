const express= require("express")
const router = express.Router();

router.post('/addfavourites', (req, res) => {
    const { id, title} = req.body;
    db.query('INSERT INTO favourites (id, title) VALUES (?, ?)', [id, title], (err) => {
      if (err) throw err;
      res.send('movies saved!');
    });
  });
  router.get('/favourites', (req, res) => {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter
    
    const query = `
      SELECT m.id, m.title, m.description, m.release_year
      FROM favourites f
      JOIN movies m ON f.movie_id = m.id
      WHERE f.user_id = ?
    `;
    
    connection.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch favorites', error: err.message });
      }
      res.status(200).json({ movies: results });
    });
  });
  
module.exports=router
  
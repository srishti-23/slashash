const mysql = require('mysql2');
const connectDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fvrtmovie_db'
  });
  
  connectDb.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
  });

module.exports=connectDb
  
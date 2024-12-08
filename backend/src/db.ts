// backend/src/db.ts
import mysql from 'mysql2';

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'RkQ52bSD*7',
  database: 'formbuilder'
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database.");
  }
});

export default db;

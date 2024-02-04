const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'cami'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get("/", (req, res) => { 
    res.send("<h2>Hello World</h2>"); 
}); 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

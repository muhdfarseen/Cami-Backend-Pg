const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'cami'
});


//Driver APP

// Route to handle updating location
app.post('/update-location', (req, res) => {
    const { bus_number, latitude, longitude } = req.body;

    db.query(
        'UPDATE location SET latitude = ?, longitude = ? WHERE bus_number = ?',
        [latitude, longitude, bus_number],
        (error, results) => {
            if (error) {
                console.error('Error updating location:', error);
                res.status(500).send('Error updating location');
            } else {
                res.status(200).send('Location updated successfully');
            }
        }
    );
});







//Admin APP

// Route to fetch student details
app.get('/students', (req, res) => {
  db.query(
      'SELECT * FROM student',
      (error, results) => {
          if (error) {
              console.error('Error fetching student details:', error);
              res.status(500).send('Error fetching student details');
          } else {
              res.status(200).json(results);
          }
      }
  );
});

app.delete('/student/:register_number', (req, res) => {
  const register_number = req.params.register_number;

  db.query(
      'DELETE FROM student WHERE register_number = ?',
      [register_number],
      (error, results) => {
          if (error) {
              console.error('Error deleting student:', error);
              res.status(500).send('Error deleting student');
          } else {
              res.status(200).send('Student deleted successfully');
          }
      }
  );
});



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

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

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require("express");
const { Pool } = require('pg');
const cors = require("cors");
const http = require("http");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const pool = new Pool({
  connectionString: "postgres://default:Fe36EZguRqTd@ep-lingering-scene-a43952jd-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
})

// const pool = new Pool({
//   user: "cami",
//   host: "postgres://cami:aMOzkMLag3hjKB0UeCyI8rHGtitYxIbv@dpg-cnk32t5jm4es73en83lg-a/camipgsql",
//   database:"camipgsql",
//   password: "aMOzkMLag3hjKB0UeCyI8rHGtitYxIbv",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false 
//   }
// });

pool.connect((err) => {
  if (err) throw err
  console.log("connect to db")
});


//----------------------------------------------------------Driver APP

// Route to handle updating location
app.post("/update-location", (req, res) => {
  const { bus_number, latitude, longitude } = req.body;

  pool.query(
    "UPDATE location SET latitude = $1, longitude = $2 WHERE bus_number = $3",
    [latitude, longitude, bus_number],
    (error, results) => {
      if (error) {
        console.error("Error updating location:", error);
        res.status(500).send("Error updating location");
      } else {
        res.status(200).send("Location updated successfully");
      }
    }
  );
});

//----------------------------------------------------------Admin APP

// Route to fetch student details
app.get("/students", (req, res) => {
  pool.query("SELECT * FROM student", (error, results) => {
    if (error) {
      console.error("Error fetching student details:", error);
      res.status(500).send("Error fetching student details");
    } else {
      res.status(200).json(results.rows);
    }
  });
});

app.delete("/student/:register_number", (req, res) => {
  const register_number = req.params.register_number;

  pool.query(
    "DELETE FROM student WHERE register_number = $1",
    [register_number],
    (error, results) => {
      if (error) {
        console.error("Error deleting student:", error);
        res.status(500).send("Error deleting student");
      } else {
        res.status(200).send("Student deleted successfully");
      }
    }
  );
});

// Route to fetch bus locations
app.get("/bus-locations", (req, res) => {
  pool.query("SELECT * FROM location", (error, results) => {
    if (error) {
      console.error("Error fetching bus locations:", error);
      res.status(500).send("Error fetching bus locations");
    } else {
      const busLocations = {};
      results.rows.forEach((row) => {
        busLocations[row.bus_number] = {
          latitude: row.latitude,
          longitude: row.longitude,
        };
      });
      res.status(200).json(busLocations);
    }
  });
});

// Route to delete all records of a given admission year
app.delete("/delete-student/:admission_year", (req, res) => {
  const admission_year = req.params.admission_year;

  pool.query(
    "DELETE FROM student WHERE admission_year = $1",
    [admission_year],
    (error, results) => {
      if (error) {
        console.error("Error deleting students of admission year:", error);
        res.status(500).send("Error deleting students of admission year");
      } else {
        res.status(200).send("Students of admission year deleted successfully");
      }
    }
  );
});

// Route to fetch delivered messages
app.get("/delivered-messages", (req, res) => {
  pool.query("SELECT * FROM message", (error, results) => {
    if (error) {
      console.error("Error fetching student details:", error);
      res.status(500).send("Error fetching student details");
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// Route to delete a specific message
app.delete("/message/:msg_id", (req, res) => {
  const msg_id = req.params.msg_id;

  pool.query(
    "DELETE FROM message WHERE msg_id = $1",
    [msg_id],
    (error, results) => {
      if (error) {
        console.error("Error deleting message:", error);
        res.status(500).send("Error deleting message");
      } else {
        res.status(200).send("Message deleted successfully");
      }
    }
  );
});

// Route to delete all messages
app.delete("/delete-all-messages", (req, res) => {
  pool.query("DELETE FROM message", (error, results) => {
    if (error) {
      console.error("Error deleting all messages:", error);
      res.status(500).send("Error deleting all messages");
    } else {
      res.status(200).send("All messages deleted successfully");
    }
  });
});

// Route to handle composing and sending messages
app.post("/compose-message", (req, res) => {
  const {
    subject,
    description,
    "rec-dept": recDept,
    "rec-year": recYear,
  } = req.body;

  pool.query(
    'INSERT INTO message (subject, description, "rec-dept", "rec-year") VALUES ($1, $2, $3, $4)',
    [subject, description, JSON.stringify(recDept), JSON.stringify(recYear)],
    (error, results) => {
      if (error) {
        console.error("Error composing message:", error);
        res.status(500).send("Error composing message");
      } else {
        res.status(200).send("Message composed and sent successfully");
      }
    }
  );
});

// Route to update student information
app.put("/student/:older_register_number", (req, res) => {
  console.log("Request Body:", req.body);
  const old_register_number = req.params.older_register_number;
  const {
    register_number,
    email_id,
    full_name,
    department,
    admission_year,
    bus_from,
    bus_number,
    pass_status,
    amount_paid,
    paid_on,
    pass_expires_on,
    dob,
  } = req.body;
  pool.query(
    'UPDATE student SET register_number= $1, email_id = $2, full_name = $3, department = $4, admission_year = $5, bus_from = $6, bus_number = $7,pass_status = $8, amount_paid = $9, paid_on = $10, pass_expires_on = $11, "dob" = $12 WHERE register_number = $13',
    [
      register_number,
      email_id,
      full_name,
      department,
      admission_year,
      bus_from,
      bus_number,
      pass_status,
      amount_paid,
      paid_on,
      pass_expires_on,
      dob,
      old_register_number,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating student:", error);
        res.status(500).send("Error updating student");
      } else {
        res.status(200).send("Student updated successfully");
      }
    }
  );
});

//----------------------------------------------------------Student APP

// Route to handle user registration
app.post("/register", (req, res) => {
  const {
    register_number,
    email_id,
    full_name,
    department,
    admission_year,
    dob,
  } = req.body;

  pool.query(
    "INSERT INTO student (register_number, email_id, full_name, department, admission_year, dob) VALUES ($1, $2, $3, $4, $5, $6)",
    [register_number, email_id, full_name, department, admission_year, dob],
    (error, results) => {
      if (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
      } else {
        res.status(200).send("User registered successfully");
      }
    }
  );
});

// Route to handle user login
app.post("/login", (req, res) => {
  const registerNumber = req.body.registerNumber;
  const dob = req.body.dob;

  pool.query(
    "SELECT * FROM student WHERE register_number = $1 AND dob = $2",
    [registerNumber, dob],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (result.rows.length > 0) {
        // If login is successful, return all student data
        res.status(200).json(result.rows[0]);
      } else {
        // If login fails, return a generic message
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

// Route to get message for specific year and dept
app.get("/delivered-messages/:admission_year/:department", (req, res) => {
  const { admission_year, department } = req.params;

  // Query the database to fetch messages that match the user's admission year and department,
  // as well as messages intended for all users
  pool.query(
    "SELECT * FROM message WHERE (description->>'rec-year' = $1 OR description->>'rec-year' = '[\"All\"]') AND (description->>'rec-dept' = $2 OR description->>'rec-dept' = '[\"All\"]')",
    [JSON.stringify(admission_year), JSON.stringify(department)],
    (error, results) => {
      if (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Error fetching messages");
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

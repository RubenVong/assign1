const express = require("express");
const mysql = require("mysql2")

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "csce41333user",
  password: "csce41333pass",
  database: "assign1",
  connectionLimit: 5,
});

//*** Middleware */
app.use(express.json());
app.use(express.static('public'));

//** Web API */
app.get("/users", function (req, res) {
  const sql = "SELECT * FROM users";
  pool.execute(sql, function (err, result, fields) {
    res.json(result);
  });
});

//The post 
app.post('/users', (req, res) => {
    const{username,lastname,firstname,passwd,email,urole} = req.body;
    //error checking
    if (!username || !lastname || !firstname || !passwd || !email || !urole) {
        return res.status(400).json({ message: 'Something is missing in the request.'});
    }

    const query = 'INSERT INTO users(username,lastname,firstname,passwd,email,urole) values(?, ?, ?, ?, ?, ?)';
    pool.execute(query, [username, lastname, firstname, passwd, email, urole], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to add user to database.'});
        }
        res.status(201).json({ message: 'User added successfully!'});
    });
});


app.listen(3000, function () {
  console.log("Listening on port 3000..");
});

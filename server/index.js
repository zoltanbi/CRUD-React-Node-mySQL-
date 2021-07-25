const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_database"
});

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO movie_reviews (movie_name, review) VALUES ('inception', 'good movie');"
    db.query(sqlInsert, (err, result) => {
        res.send("test")
        console.log(err);
        console.log(result);
    })

    }
)

app.listen(3001, () => {
    console.log('running on port 3001');
});
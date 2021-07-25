const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_database"
});

app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO move_reviews (movie_name, review) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});
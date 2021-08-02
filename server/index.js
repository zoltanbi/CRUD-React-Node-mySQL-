const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_database"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {

    const sqlSelect = "SELECT * FROM movie_reviews";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })

})

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movie_name, review) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err)
        console.log(result);
    });
});

app.delete('/api/delete/:movieId', (req, res) => {
    const movieId = req.params.movieId
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?"

    db.query(sqlDelete, movieId, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
})

app.put('/api/update', (req, res) => {
    const movieId = req.body.movieId
    const review = req.body.movieReview
    const sqlUpdate = "UPDATE movie_reviews SET review = ? WHERE id = ?"

    db.query(sqlUpdate, [review, movieId], (err, result) => {
        if (err) {
            console.log(err)
        }
    })

})

app.listen(3001, () => {
    console.log('running on port 3001');
});
import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([])

    const [newReview, setNewReview] = useState('')

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((res) => {
            setMovieList(res.data);
        });
    }, []);

    const submitReview = () => {
        Axios.post('http://localhost:3001/api/insert', {
            movieName: movieName,
            movieReview: review,
        })

        setMovieList([
            ...movieReviewList,
            {movieName: movieName, movieReview: review},
        ]);
    };

    const deleteReview = (movieId) => {
        Axios.delete(`http://localhost:3001/api/delete/${movieId}`);
    }

    const updateReview = (movieId) => {
        Axios.put('http://localhost:3001/api/update', {
            movieId: movieId,
            movieReview: newReview,
        });

        setNewReview("");
    }

    return (
        <div className="App">
          <h1>CRUD APPLICATION</h1>

          <div className="form">
              <label>Movie Name:</label>
              <input
                  type="text"
                  name="movieName"
                  onChange={(e) => {
                      setMovieName(e.target.value)
                  }}
              />
              <label>Review:</label>
              <input
                  type="text"
                  name="review"
                  onChange={(e) => {
                      setReview(e.target.value)
                  }}
              />

              <button onClick={submitReview}>Submit</button>

              {movieReviewList.map((val) => {
                  return (
                      <div className="card">
                          <h1>{val.movie_name}</h1>
                          <p>{val.review}</p>

                          <button onClick={() => {deleteReview(val.id)}}>Delete</button>
                          <input type="text" id="updateInput" onChange={(e) => {
                              setNewReview(e.target.value)
                          }}/>

                          <button onClick={() => {updateReview(val.id)}}>Update</button>
                      </div>
                  )
              })}
          </div>

        </div>
    );
}

export default App;

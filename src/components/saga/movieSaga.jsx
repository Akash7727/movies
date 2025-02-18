//THIS IS MY MOVIEW SAGA ND NOT USED


// import { call, put, takeEvery } from 'redux-saga/effects';
// import { setMovies, addMovie, editMovie, deleteMovie } from './movieSlice';

// // Fetch movies from the API
// function* fetchMovies() {
//   try {
//     const response = yield call(fetch, 'http://localhost:3000/movies');
//     if (!response.ok) {
//       throw new Error('Failed to fetch movies');
//     }
//     const data = yield response.json();
//     yield put(setMovies(data)); // Dispatch the action to set movies in the state
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Add a new movie to the API
// function* addMovieSaga(action) {
//   try {
//     // fetch kro current list  movies ki  to determine the next ID
//     const response = yield call(fetch, 'http://localhost:3000/movies');
//     if (!response.ok) {
//       throw new Error('Failed to fetch movies for ID increment');
//     }
//     const movies = yield response.json();

//     // Determine the next ID max id ki help
//     const maxId = movies.reduce((max, movie) => Math.max(max, parseInt(movie.id)), 0);
//     const newId = (maxId + 1).toString(); // Increment the ID

//     // Create the new movie object with the incremented ID
//     const newMovie = {
//       ...action.payload,
//       id: newId, // Assign the new ID
//     };

//     // Send the new movie to the API
//     const addResponse = yield call(fetch, 'http://localhost:3000/movies', {
//       method: 'POST',

//       body: JSON.stringify(newMovie),
//     });

//     if (!addResponse.ok) {
//       throw new Error('Failed to add movie');
//     }
//     const data = yield addResponse.json();
//     yield put(addMovie.fulfilled(data)); // Dispatch the action to add the movie to the state
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Edit an existing movie in the API
// function* editMovieSaga(action) {
//   try {
//     const response = yield call(fetch, `http://localhost:3000/movies/${action.payload.id}`, {
//       method: 'PUT',
     
//       body: JSON.stringify(action.payload),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update movie');
//     }
//     const data = yield response.json();
//     yield put(editMovie.fulfilled(data)); // Dispatch the action to update the movie in the state
//   } catch (error) {
//     console.error(error);

//   }
// }

// // Delete a movie from the API
// function* deleteMovieSaga(action) {
//   try {
//     const response = yield call(fetch, `http://localhost:3000/movies/${action.payload}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete movie');
//     }
//     yield put(deleteMovie.fulfilled(action.payload)); // Dispatch the action to remove the movie from the state
//   } catch (error) {
//     console.error(error);

//   }
// }

// // Watcher saga to listen for actions
// export function* watchMovieActions() {
//   yield takeEvery('movies/fetchMovies', fetchMovies);
//   yield takeEvery('movies/addMovie', addMovieSaga);
//   yield takeEvery('movies/editMovie', editMovieSaga);
//   yield takeEvery('movies/deleteMovie', deleteMovieSaga);
// }

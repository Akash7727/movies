import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from '../redux/movieSlice';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [movieStatus, dispatch]);

  const handleDelete = () => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch(deleteMovie()); // Dispatch the deleteMovie action
    }
  };

  let content;

  if (movieStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (movieStatus === 'succeeded') {
    content = movies.map((movie) => (
      <div key={movie.id}>
        <h3>{movie.title} ({movie.year})</h3>
        <img src={movie.poster} alt={movie.title} style={{ width: '100px' }} />
        <button onClick={() => handleDelete(movie.id)}>Delete</button>
      </div>
    ));
  } else if (movieStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Movie List</h2>
      {content}
    </div>
  );
};

export default MovieList;
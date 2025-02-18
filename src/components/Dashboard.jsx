import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from '../redux/movieSlice';
import MovieForm from './MovieForm';
import { useNavigate } from 'react-router-dom'; 
import { logout } from '../redux/authSlice'; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.list);
  const error = useSelector((state) => state.movies.error);
  
  const [isEditing, setIsEditing] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch movies when the component mounts
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        await dispatch(fetchMovies())
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [dispatch]);
//LOGOUT Function

const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data fropm luocal storage
    dispatch(logout()); // Dispatch the logout action to clear user state
    navigate('/login'); // Navigate to the login page
  };



  //HANDLE PROFILEle
const handleProfile=()=>{
  navigate('/profile')


}

  // Handle editing a movienction
  const handleEdit = (movie) => {
    setMovieToEdit(movie);
    setIsEditing(true);
  };

  // Handle deleting a movie
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await dispatch(deleteMovie(id));
      } catch (err) {
        console.error('Failed to delete movie:', err);
      }
    }
  };

  return (
    <div>
      <h1>Movie Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <MovieForm 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        movieToEdit={movieToEdit} 
      />
      
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <>
          <h2>Movie List</h2>
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <h3>{movie.title} ({movie.year})</h3>
                  <img src={movie.poster} alt={movie.title} style={{ width: '100px' }} />
                  <button onClick={() => handleEdit(movie)}>Edit</button>
                  <button onClick={() => handleDelete(movie.id)}>Delete</button>
                  
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies available. Please add some!</p>
          )}
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleProfile}>Profile</button>
    </div>
  );
};

export default Dashboard;
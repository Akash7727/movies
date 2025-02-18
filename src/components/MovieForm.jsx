import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, editMovie } from '../redux/movieSlice';
import PropTypes from 'prop-types';

const MovieForm = ({ isEditing, setIsEditing, movieToEdit }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log('User :', user)
  const existingMovies = useSelector((state) => state.movies.list); // Get the current list of movies

  // Populate form fields if editing a movie
  useEffect(() => {
    if (isEditing && movieToEdit) {
      setTitle(movieToEdit.title);
      setYear(movieToEdit.year);
      setPoster(movieToEdit.poster);
    } else {
      // Reset form fields when not editing
      setTitle('');
      setYear('');
      setPoster('');
    }
  }, [isEditing, movieToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate year input
    if (!/^\d{4}$/.test(year)) {
      setError('Please enter a valid year (4 digits).');
      return;
    }
  
    const newMovie = {
      title,
      year,
      poster,
    };
  
    // Check for duplicates in the current movie list
    const isDuplicate = existingMovies.some(movie => 
      movie.title === title && movie.year === year
    );
  
    if (isDuplicate) {
      setError('This movie already exists.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      if (isEditing) {
        // Dispatch the editMovie action
        const resultAction = await dispatch(editMovie({ ...newMovie, id: movieToEdit.id }));
        if (editMovie.fulfilled.match(resultAction)) {
          // Successfully edited
          setIsEditing(false); // Reset editing state
        } else {
          // Handle error
          throw new Error(resultAction.error.message);
        }
      } else {
        // Dispatch the addMovie action
        const resultAction = await dispatch(addMovie(newMovie));
        if (addMovie.fulfilled.match(resultAction)) {
          // Successfully added
          setTitle('');
          setYear('');
          setPoster('');
        } else {
          // Handle error
          throw new Error(resultAction.error.message);
        }
      }
    } catch (error) {
      console.error('Error adding/updating movie:', error);
      setError('Failed to add/update movie. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie Title"
        required
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Release Year (YYYY)"
        required
      />
      <input
        type="text"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        placeholder="Poster URL"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : (isEditing ? 'Update Movie' : 'Add Movie')}
      </button>
    </form>
  );
};

// PropTypes for validation
MovieForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  movieToEdit: PropTypes.object,
};

export default MovieForm;
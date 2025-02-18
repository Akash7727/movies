import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/movies';

// Async thunk to fetch movies from the API
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data; // Assuming the API returns an array of movies
});


// Async thunk to add a movie
export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie, { getState }) => {
  const state = getState();
  
  const UserId = state.auth.user.id; // Get the user ID from the auth state

  // Fetch existing movies to determine the next Id
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch movies for ID ');
  }
  const movies = await response.json();

  // Determine the next ID by finding the maximum existing ID
  const maxId = movies.reduce((max, movie) => Math.max(max, parseInt(movie.id)), 0);
  const newId = (maxId + 1).toString(); // Increment the ID

  // Create the new movie object with the incremented ID and user ID
  const movieToAdd = {
    ...newMovie,
    id: newId, // Assign the new ID
    userId: UserId, // Assign the user ID
  };

  const addResponse = await fetch(API_URL, {
    method: 'POST',
  
    body: JSON.stringify(movieToAdd),
  });

  if (!addResponse.ok) {
    throw new Error('Failed to add movie');
  }
  const data = await addResponse.json();
  return data; // Return the newly created movie
});

// Async thunk to edit a movie
export const editMovie = createAsyncThunk('movies/editMovie', async (updatedMovie) => {
  const response = await fetch(`${API_URL}/${updatedMovie.id}`, {
    method: 'PUT',
 
    body: JSON.stringify(updatedMovie),
  });
  if (!response.ok) {
    throw new Error('Failed to update movie');
  }
  const data = await response.json();
  return data; // Return the updated movie
});

// Async thunk to delete a movie
export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete movie');
  }
  return id; // Return the ID of the deleted movie
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' 
    error: null,
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; // Add the fetched movies to the state
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        const exists = state.list.some(movie => 
          movie.title === action.payload.title && movie.year === action.payload.year
        );
        if (!exists) {
          state.list.push(action.payload); // Add the new movie to the state only if it doesn't exist
 }
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const index = state.list.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload; // Update the movie in the state
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter(movie => movie.id !== action.payload); // Remove the deleted movie from the state
      });
  },
});

// Export actions
export const { setMovies } = movieSlice.actions;

// Default export of the reducer
export default movieSlice.reducer; 
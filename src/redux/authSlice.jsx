import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Initialize user from local storage
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to sign up a new user
export const signupUser  = createAsyncThunk('auth/signupUser ', async (userData) => {
  // Fetch existing users to determine the highest id
  const usersResponse = await fetch('http://localhost:3000/users');
  if (!usersResponse.ok) {
    throw new Error('Failed to fetch users');
  }
  const users = await usersResponse.json();

  // Calculate the new id
  const newId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id))) + 1 : 1;

  // Create the new user object with the new id
  const newUser  = { ...userData, id: newId };

  // Send a POST request to the API to create a new user
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser ),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up user');
  }

  const data = await response.json();
  return data; // Return the created user data
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to local storage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Remove user from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser .fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Set the user state to the newly signed up user
        localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to local storage
      })
      .addCase(signupUser .rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Handle error
      });
  },
});

// Export actions
export const { login, logout } = authSlice.actions;

// Default export of the reducer
export default authSlice.reducer;
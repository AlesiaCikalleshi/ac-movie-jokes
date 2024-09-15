import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./api";

const initialState = {
  movies: [],
  status: "idle", // 'idle' / 'loading' / 'succedded' / 'failed'
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const data = await fetchPopularMovies();
  return data.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.movies.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies.status = "succeeded";
        state.movies.movies = action.payload.joke;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.movies.status = "failed";
        state.movies.error = action.error.message;
      });
  },
});

export const selectAllMovies = (state) => state.movies.movies;
export const selectMovieById = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id === Number(movieId));
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;

export default moviesSlice.reducer;

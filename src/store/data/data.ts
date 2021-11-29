import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { APIRoute } from '../../const';
import { MovieFromServer } from '../../types/movie';
import { Comment, CommentPost } from '../../types/comment';
import { Data } from '../../types/state';
import { adaptServerMovieToClient } from '../../services/adapter';
import { mockMovie } from '../../utils/mocks';

type ChangeFavoriteStatusParams = {
  id: number,
  status: number
}

type AddReviewParams = {
  id: number;
  reviewData: CommentPost;
}

const loadPoster = createAsyncThunk(
  'data/loadPoster',
  async () => {
    const { data } = await api.get<MovieFromServer>(APIRoute.Promo);

    return data;
  },
);

const loadMovies = createAsyncThunk(
  'data/loadMovies',
  async () => {
    const { data } = await api.get<MovieFromServer[]>(APIRoute.Movies);

    return data;
  },
);

const loadSimilarMovies = createAsyncThunk(
  'data/loadSimilarMovies',
  async (id: number) => {
    const { data } = await api.get<MovieFromServer[]>(`${APIRoute.Movies}/${id}/similar`);

    return data;
  },
);

const loadFavoriteMovies = createAsyncThunk(
  'data/loadFavoriteMovies',
  async () => {
    const { data } = await api.get<MovieFromServer[]>(APIRoute.Favorite);

    return data;
  },
);

const loadMovie = createAsyncThunk(
  'data/loadMovie',
  async (id: number) => {
    const { data } = await api.get<MovieFromServer>(`${APIRoute.Movies}/${id}`);

    return data;
  },
);

const loadComments = createAsyncThunk(
  'data/loadComments',
  async (id: number) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

    return data;
  },
);

const addReview = createAsyncThunk(
  'data/addReview',
  async ({id, reviewData}: AddReviewParams) => {
    const { data } = await api.post(`${APIRoute.Comments}/${id}`, reviewData);

    return data;
  },
);

const changeFavoriteStatus = createAsyncThunk(
  'data/changeFavoriteStats',
  async ({ id, status }: ChangeFavoriteStatusParams) => {
    const { data } = await api.post<MovieFromServer>(`${APIRoute.Favorite}/${id}/${status}`);

    return data;
  },
);

const initialState: Data = {
  promo: mockMovie,
  movies: [],
  similarMovies: [],
  favoriteMovies: [],
  movie: mockMovie,
  isMovieLoaded: false,
  comments: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetMovie: (state) => {
      state.movie = initialState.movie;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.movies = action.payload.map((movie) => adaptServerMovieToClient(movie));
      })
      .addCase(loadSimilarMovies.fulfilled, (state, action) => {
        state.similarMovies = action.payload.map((movie) => adaptServerMovieToClient(movie));
      })
      .addCase(loadFavoriteMovies.fulfilled, (state, action) => {
        state.favoriteMovies = action.payload.map((movie) => adaptServerMovieToClient(movie));
      })
      .addCase(loadMovie.pending, (state) => {
        state.isMovieLoaded = false;
      })
      .addCase(loadMovie.fulfilled, (state, action) => {
        state.movie = adaptServerMovieToClient(action.payload);
        state.isMovieLoaded = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(loadPoster.fulfilled, (state, action) => {
        state.promo = adaptServerMovieToClient(action.payload);
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const adaptedMovie = adaptServerMovieToClient(action.payload);

        state.movies = state.movies.map((movie) => {
          if (movie.id === adaptedMovie.id) {
            return adaptedMovie;
          }

          return movie;
        });

        if (state.promo.id === adaptedMovie.id) {
          state.promo = adaptedMovie;
        }

        if (state.movie.id === adaptedMovie.id) {
          state.movie = adaptedMovie;
        }
      });
  },
});

export const { resetMovie } = dataSlice.actions;
export { loadMovies, loadSimilarMovies, loadFavoriteMovies, loadMovie, loadComments, addReview, loadPoster, changeFavoriteStatus };
export default dataSlice.reducer;

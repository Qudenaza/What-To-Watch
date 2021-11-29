import { RootState } from '../store/root-reducer';
import { AuthorizationStatus } from '../const';
import { Movie } from './movie';
import { AuthInfo } from './auth';
import { Comment } from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};

export type Data = {
  promo: Movie,
  movies: Movie[],
  similarMovies: Movie[],
  favoriteMovies: Movie[],
  movie: Movie,
  isMovieLoaded: boolean,
  comments: Comment[],
}

export type State = RootState;

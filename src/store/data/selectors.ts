import { State } from '../../types/state';
import { Movie } from '../../types/movie';
import { NameSpace } from '../root-reducer';
import { Comment } from '../../types/comment';

export const selectMovies = (state: State): Movie[] => state[NameSpace.Data].movies;
export const selectSimilarMovies = (state: State): Movie[] => state[NameSpace.Data].similarMovies;
export const selectFavoriteMovies = (state: State): Movie[] => state[NameSpace.Data].favoriteMovies;
export const selectMovie = (state: State): Movie => state[NameSpace.Data].movie;
export const selectIsMovieLoaded = (state: State): boolean => state[NameSpace.Data].isMovieLoaded;
export const selectPromoMovie = (state: State): Movie => state[NameSpace.Data].promo;
export const selectComments = (state: State): Comment[] => state[NameSpace.Data].comments;

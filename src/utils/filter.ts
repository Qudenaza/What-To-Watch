import { FILTER_TYPE } from '../const';
import { Movie } from '../types/movie';

export const filter = {
  [FILTER_TYPE.ALL]: (movies: Movie[]): Movie[] => movies,
  [FILTER_TYPE.ADVENTURES]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.ADVENTURES),
  [FILTER_TYPE.COMEDIES]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.COMEDIES),
  [FILTER_TYPE.CRIME]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.CRIME),
  [FILTER_TYPE.DOCUMENTARY]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.DOCUMENTARY),
  [FILTER_TYPE.DRAMAS]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.DRAMAS),
  [FILTER_TYPE.HORROR]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.HORROR),
  [FILTER_TYPE.KIDS]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.KIDS),
  [FILTER_TYPE.ROMANCE]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.ROMANCE),
  [FILTER_TYPE.THRILLERS]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.THRILLERS),
  [FILTER_TYPE.FANTASIES]: (movies: Movie[]): Movie[] => movies.filter((movie) => movie.genre === FILTER_TYPE.FANTASIES),
};

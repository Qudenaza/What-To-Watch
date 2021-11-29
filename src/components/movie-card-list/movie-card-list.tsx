import { useState } from 'react';
import { Movie } from '../../types/movie';
import MovieCardSmall from '../movie-card-small/movie-card-small';

type Props = {
  movies: Movie[];
};

function MovieCardList({ movies }: Props): JSX.Element {
  const [selectedMovieId, setSelectedMovieId] = useState(-1);

  return (
    <div className="catalog__films-list">
      {movies.map((movie) => (
        <MovieCardSmall key={movie.id} movie={movie} selectedMovieId={selectedMovieId} onMouseEnter={setSelectedMovieId} />
      ))}
    </div>
  );
}

export default MovieCardList;

import { useEffect, useState } from 'react';
import { filter } from '../../utils/filter';
import { Movie } from '../../types/movie';
import ButtonMore from '../button-more/button-more';
import MovieCardList from '../movie-card-list/movie-card-list';
import GenresList from '../genres-list/genres-list';
import { FILTER_TYPE } from '../../const';

type Props = {
  movies: Movie[];
};

const STEP_INCREASE_COUNT = 8;

function Catalog({ movies }: Props): JSX.Element {
  const [movieCount, setMovieCount] = useState(STEP_INCREASE_COUNT);
  const [selectedFilter, setFilter] = useState(FILTER_TYPE.ALL);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    setFilteredMovies(filter[selectedFilter](movies));
    setMovieCount(STEP_INCREASE_COUNT);
  }, [selectedFilter, movies]);

  const handleShowMoreButtonClick = () => {
    if (movieCount + STEP_INCREASE_COUNT >= filteredMovies.length) {
      setMovieCount(filteredMovies.length);
      return;
    }

    setMovieCount(movieCount + STEP_INCREASE_COUNT);
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList onFilterChange={setFilter} selectedFilter={selectedFilter} />
      <MovieCardList movies={filteredMovies.slice(0, movieCount)} />
      {movies.length > 0 && filteredMovies.length > movieCount && (
        <div className="catalog__more">
          <ButtonMore onButtonClick={handleShowMoreButtonClick} />
        </div>
      )}
    </section>
  );
}

export default Catalog;

import { Movie } from '../../types/movie';
import { convertMinsToHrsMins } from '../../utils/common';
import cn from 'classnames';

type Props = {
  movie: Movie;
  config: {
    detailsTab: boolean;
  };
};

function MovieText({ movie, config }: Props): JSX.Element {
  return (
    <div className={cn('film-card__text', { 'film-card__row': config.detailsTab })}>
      {!config.detailsTab ? (
        <>
          <p>{movie.description}</p>
          <p className="film-card__director">
            <strong>Director: {movie.director}</strong>
          </p>
          <p className="film-card__starring">
            <strong>Starring: {movie.starring.map((actor) => `${actor}, `)} and other</strong>
          </p>
        </>
      ) : (
        <>
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{movie.director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value" style={{ whiteSpace: 'pre' }}>
                {movie.starring.map((actor, index, array) => (index === array.length - 1 ? actor : `${actor},  \n`))}
              </span>
            </p>
          </div>
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{convertMinsToHrsMins(movie.runTime)}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{movie.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{movie.released}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieText;

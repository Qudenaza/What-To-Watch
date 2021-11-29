import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Movie } from '../../types/movie';
import browserHistory from '../../browser-history';
import VideoPlayer from '../video-player/video-player';

type Props = {
  movie: Movie;
  selectedMovieId: number;
  onMouseEnter: (id: number) => void;
};

function MovieCardSmall({ movie, selectedMovieId, onMouseEnter }: Props): JSX.Element {
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleImageClick = (): void => {
    browserHistory.push(`${AppRoute.Movie}/${movie.id}`);
  };

  const handleMouseEnter = (): void => {
    timerRef.current = setTimeout(() => {
      onMouseEnter(movie.id);
    }, 1000);
  };

  const handleMouseLeave = (): void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    onMouseEnter(-1);
  };

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="small-film-card__image" onClick={handleImageClick}>
        {movie.id === selectedMovieId ? (
          <VideoPlayer src={movie.previewVideoLink} previewImage={movie.previewImage} />
        ) : (
          <img src={movie.previewImage} alt={movie.name} width="280" height="175" />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Movie}/${movie.id}`}>
          {movie.name}
        </Link>
      </h3>
    </article>
  );
}

export default MovieCardSmall;

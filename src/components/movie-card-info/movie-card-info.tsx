import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Movie } from '../../types/movie';
import MovieCardPoster from '../movie-card-preview/movie-card-preview';
import ButtonAdd from '../button-add/button-add';
import ButtonPlay from '../button-play/button-play';
import { AppDispatch } from '../../store/store';
import { changeFavoriteStatus } from '../../store/data/data';
import { toast } from 'react-toastify';

type Props = {
  movieData: Movie;
};

function MovieCardInfo({ movieData }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = () => {
    const status = movieData.isFavorite ? 0 : 1;
    const id = movieData.id;

    dispatch(
      changeFavoriteStatus({
        id,
        status,
      }),
    )
      .then(unwrapResult)
      .then((movie) => {
        const message = movie['is_favorite']
          ? 'Фильм был успешно добавлен в ваш список избранного'
          : 'Фильм был успешно удален из вашего списка избранного';

        toast.success(message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="film-card__info">
      <MovieCardPoster
        previewUrl={movieData.posterImage}
        previewAltText={movieData.name}
        config={{
          bigSize: false,
        }}
      />
      <div className="film-card__desc">
        <h2 className="film-card__title">{movieData.name}</h2>
        <p className="film-card__meta">
          <span className="film-card__genre">{movieData.genre}</span>
          <span className="film-card__year">{movieData.released}</span>
        </p>
        <div className="film-card__buttons">
          <ButtonPlay id={movieData.id} />
          <ButtonAdd isFavorite={movieData.isFavorite} onButtonClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default MovieCardInfo;

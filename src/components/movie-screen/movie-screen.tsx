import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store/store';
import { loadMovie, loadComments, loadSimilarMovies, changeFavoriteStatus } from '../../store/data/data';
import { selectComments, selectMovie, selectSimilarMovies, selectIsMovieLoaded } from '../../store/data/selectors';
import MovieCardSmall from '../movie-card-small/movie-card-small';
import { toast } from 'react-toastify';
import PageHeader from '../page-header/page-header';
import MovieCardPreview from '../movie-card-preview/movie-card-preview';
import MovieTabs from '../movie-tabs/movie-tabs';
import MovieText from '../movie-text/movie-text';
import MovieRating from '../movie-rating/movie-rating';
import ButtonAdd from '../button-add/button-add';
import ButtonPlay from '../button-play/button-play';
import Loader from '../loader/loader';
import Reviews from '../reviews/reviews';
import PageFooter from '../page-footer/page-footer';
import browserHistory from '../../browser-history';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

function MovieScreen(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const movie = useSelector(selectMovie);
  const similarMovies = useSelector(selectSimilarMovies);
  const isMovieLoaded = useSelector(selectIsMovieLoaded);
  const comments = useSelector(selectComments);
  const [selectedMovieId, setMovieId] = useState(-1);
  const [activeTab, setActiveTab] = useState('Overview');
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadMovie(+id));
    dispatch(loadSimilarMovies(+id)).catch(() => {
      toast.error('Не удалось загрузить список похожих фильмов.');
    });
    dispatch(loadComments(+id)).catch(() => {
      toast.error('Не удалось загрузить отзывы.');
    });
  }, [id, dispatch]);

  const handleFavoriteButtonClick = () => {
    dispatch(
      changeFavoriteStatus({
        id: movie.id,
        status: movie.isFavorite ? 0 : 1,
      }),
    )
      .then(unwrapResult)
      .then((item) => {
        const message = item['is_favorite']
          ? 'Фильм был успешно добавлен в ваш список избранного'
          : 'Фильм был успешно удален из вашего списка избранного';

        toast.success(message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (!isMovieLoaded) {
    return <Loader />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <PageHeader config={{ myListPage: false, reviewPage: false, rootPage: true }} />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
              </p>
              <div className="film-card__buttons">
                <ButtonPlay id={movie.id} />
                <ButtonAdd isFavorite={movie.isFavorite} onButtonClick={handleFavoriteButtonClick} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link className="btn film-card__button" to={`${browserHistory.location.pathname}${AppRoute.Review}`}>
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <MovieCardPreview previewUrl={movie.posterImage} previewAltText={movie.name} config={{ bigSize: true }} />
            <div className="film-card__desc">
              <MovieTabs activeTab={activeTab} onClick={setActiveTab} path="/films/1" />
              {activeTab === 'Overview' && (
                <>
                  <MovieRating movie={movie} />
                  <MovieText movie={movie} config={{ detailsTab: false }} />
                </>
              )}
              {activeTab === 'Details' && <MovieText movie={movie} config={{ detailsTab: true }} />}
              {activeTab === 'Reviews' && <Reviews comments={comments} />}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {similarMovies.map((item) => (
              <MovieCardSmall key={item.id} movie={item} selectedMovieId={selectedMovieId} onMouseEnter={setMovieId} />
            ))}
          </div>
        </section>
        <PageFooter />
      </div>
    </>
  );
}

export default MovieScreen;

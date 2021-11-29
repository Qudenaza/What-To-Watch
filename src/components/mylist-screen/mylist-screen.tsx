import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { loadFavoriteMovies } from '../../store/data/data';
import { selectFavoriteMovies } from '../../store/data/selectors';
import { AppDispatch } from '../../store/store';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import PageHeader from '../page-header/page-header';
import MovieCardSmall from '../movie-card-small/movie-card-small';
import PageFooter from '../page-footer/page-footer';

function MyListScreen(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const [selectedMovieId, setMovieId] = useState(-1);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadFavoriteMovies());
  }, [dispatch]);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    browserHistory.push(AppRoute.Login);
  }

  return (
    <div className="user-page">
      <PageHeader config={{ myListPage: true, rootPage: false, reviewPage: false }} />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          {favoriteMovies.map((movie) => (
            <MovieCardSmall key={movie.id} selectedMovieId={selectedMovieId} onMouseEnter={setMovieId} movie={movie} />
          ))}
        </div>
      </section>
      <PageFooter />
    </div>
  );
}

export default MyListScreen;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loadMovies, loadPoster } from '../../store/data/data';
import { selectMovies } from '../../store/data/selectors';
import { AppDispatch } from '../../store/store';
import MovieCardBig from '../movie-card-big/movie-card-big';
import PageFooter from '../page-footer/page-footer';
import Catalog from '../catalog/catalog';
import Loader from '../loader/loader';

function RootScreen(): JSX.Element {
  const movies = useSelector(selectMovies);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadMovies())
      .then(unwrapResult)
      .catch((error) => toast.error(error.message));
    dispatch(loadPoster())
      .then(unwrapResult)
      .catch((error) => toast.error(error.message));
  }, [dispatch]);

  if (!movies.length) {
    return <Loader />;
  }

  return (
    <>
      <MovieCardBig />
      <div className="page-content">
        <Catalog movies={movies} />
        <PageFooter />
      </div>
    </>
  );
}

export default RootScreen;

import { useSelector } from 'react-redux';
import PageHeader from '../page-header/page-header';
import MovieCardInfo from '../movie-card-info/movie-card-info';
import { selectPromoMovie } from '../../store/data/selectors';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';

const MOCK_BG_IMAGE = 'img/bg-header.jpg';

function MovieCardBig(): JSX.Element {
  const autorizationStatus = useSelector(selectAuthorizationStatus);
  const promoMovie = useSelector(selectPromoMovie);

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={autorizationStatus === AuthorizationStatus.Auth ? promoMovie.backgroundImage : MOCK_BG_IMAGE} alt={promoMovie.name} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <PageHeader config={{ rootPage: true, reviewPage: false, myListPage: false }} />
      <div className="film-card__wrap">
        <MovieCardInfo movieData={promoMovie} />
      </div>
    </section>
  );
}

export default MovieCardBig;

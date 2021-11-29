import { useState, MouseEvent, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { AppDispatch } from '../../store/store';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { selectMovie } from '../../store/data/selectors';
import { addReview } from '../../store/data/data';
import PageHeader from '../page-header/page-header';
import MovieCardPreview from '../movie-card-preview/movie-card-preview';
import ReviewStar from '../review-star/review-star';
import { toast } from 'react-toastify';
import { CommentPost } from '../../types/comment';
import { unwrapResult } from '@reduxjs/toolkit';

const stars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function AddReviewScreen(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const movie = useSelector(selectMovie);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    browserHistory.push(AppRoute.Login);
  }

  const handleGoBackButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    browserHistory.goBack();
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setDisabled(true);

    const reviewData: CommentPost = {
      rating,
      comment,
    };

    dispatch(addReview({ id: +id, reviewData }))
      .then(unwrapResult)
      .then(() => {
        toast.success('Ваш отзыв был успешно добавлен.');

        setDisabled(false);

        browserHistory.goBack();
      })
      .catch(() => {
        toast.error('При отправке отзыва, возникла ошибка.');

        setDisabled(false);
      });
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie.backgroundImage} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <PageHeader config={{ myListPage: false, reviewPage: true, rootPage: false }}>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="#" className="breadcrumbs__link" onClick={handleGoBackButtonClick}>
                  {movie.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="#" className="breadcrumbs__link">
                  Add review
                </Link>
              </li>
            </ul>
          </nav>
        </PageHeader>
        <MovieCardPreview previewUrl={movie.posterImage} previewAltText={movie.name} config={{ bigSize: false, smallSize: true }} />
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {stars.map((value) => (
                <ReviewStar key={value} count={value} selectedCount={rating} onChange={setRating} isDisabled={isDisabled} />
              ))}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={50}
              maxLength={400}
              value={comment}
              onChange={handleCommentChange}
              disabled={isDisabled}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={comment.length < 50 || rating === 0 || isDisabled}>
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddReviewScreen;

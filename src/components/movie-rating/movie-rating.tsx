import { Movie } from '../../types/movie';

type Props = {
  movie: Movie;
};

const calculateRating = (rating: number) => {
  switch (true) {
    case rating > 0 && rating < 3:
      return 'Bad';
    case rating >= 3 && rating < 8:
      return 'Normal';
    case rating >= 8 && rating < 10:
      return 'Very good';
    case rating >= 10:
      return 'Awesome';
  }
};

// от 0 до 3 — Bad.
// от 3 до 5 — Normal.
// от 5 до 8 — Good.
// от 8 до 10 — Very good.
// 10 — Awesome.

function MovieRating({ movie }: Props): JSX.Element {
  return (
    <div className="film-rating">
      <div className="film-rating__score">{movie.rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{calculateRating(movie.rating)}</span>
        <span className="film-rating__count">{movie.scoresCount} ratings</span>
      </p>
    </div>
  );
}

export default MovieRating;

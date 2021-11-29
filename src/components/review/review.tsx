import { Comment } from '../../types/comment';

type Props = {
  comment: Comment;
};

function Review({ comment }: Props): JSX.Element {
  const date = new Date(comment.date);
  const dateOptions = { day: 'numeric' as const, year: 'numeric' as const, month: 'long' as const };
  const dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={dateTime}>
            {date.toLocaleString('en-US', dateOptions)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}

export default Review;

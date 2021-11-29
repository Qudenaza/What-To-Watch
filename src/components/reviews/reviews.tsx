import { Comment } from '../../types/comment';
import Review from '../review/review';

type Props = {
  comments: Comment[];
};

const divideCommentsOnRow = (comments: Comment[]) => {
  if (comments.length < 3) {
    return [[...comments]];
  }

  const dividedComments = [];

  for (let i = 0; i < comments.length; i += 3) {
    dividedComments.push(comments.slice(i, i + 3));
  }

  return dividedComments;
};

function Reviews({ comments }: Props): JSX.Element {
  const dividedComments = divideCommentsOnRow(comments);

  if (!comments.length) {
    return <p style={{ color: 'black' }}>No reviews yet.</p>;
  }

  return (
    <div className="film-card__reviews film-card__row">
      {dividedComments.map((row) => (
        <div className="film-card__reviews-col" key={`col-${Math.random()}`}>
          {row.map((comment) => (
            <Review key={comment.id} comment={comment} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Reviews;

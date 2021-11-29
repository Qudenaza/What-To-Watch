import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';

type Props = {
  id: number;
};

function ButtonPlay({ id }: Props): JSX.Element {
  const handlePlayButtonClick = () => {
    browserHistory.push(`${AppRoute.Player}/${id}`);
  };

  return (
    <button className="btn btn--play film-card__button" type="button" onClick={handlePlayButtonClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </button>
  );
}

export default ButtonPlay;

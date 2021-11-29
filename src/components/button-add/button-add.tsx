type Props = {
  isFavorite: boolean;
  onButtonClick: () => void;
};

function ButtonAdd({ isFavorite, onButtonClick }: Props): JSX.Element {
  return (
    <button className="btn btn--list film-card__button" type="button" onClick={onButtonClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref={isFavorite ? '#in-list' : '#add'} />
      </svg>
      <span>My list</span>
    </button>
  );
}

export default ButtonAdd;

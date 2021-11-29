type Props = {
  onButtonClick: () => void;
};

function ButtonMore({ onButtonClick }: Props): JSX.Element {
  return (
    <button className="catalog__button" type="button" onClick={onButtonClick}>
      Show more
    </button>
  );
}

export default ButtonMore;

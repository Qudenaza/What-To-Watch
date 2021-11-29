type Props = {
  count: number;
  selectedCount: number;
  isDisabled: boolean;
  onChange: (value: number) => void;
};

function ReviewStar({ count, selectedCount, isDisabled, onChange }: Props): JSX.Element {
  const handleRadioChange = () => {
    onChange(count);
  };

  return (
    <>
      <input
        className="rating__input"
        id={`star-${count}`}
        type="radio"
        name="rating"
        value={count}
        checked={selectedCount === count}
        onChange={handleRadioChange}
        disabled={isDisabled}
      />
      <label className="rating__label" htmlFor={`star-${count}`}>
        Rating {count}
      </label>
    </>
  );
}

export default ReviewStar;

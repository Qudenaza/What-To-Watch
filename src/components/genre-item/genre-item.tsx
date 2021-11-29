import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import cn from 'classnames';

type Props = {
  genre: string;
  selectedFilter: string;
  onButtonClick: (genre: string) => void;
};

function GenreItem({ genre, selectedFilter, onButtonClick }: Props): JSX.Element {
  const handleButtonClick = () => {
    onButtonClick(genre);
  };

  return (
    <li className={cn('catalog__genres-item', { 'catalog__genres-item--active': genre === selectedFilter })}>
      <Link className="catalog__genres-link" to={AppRoute.Root} onClick={handleButtonClick}>
        {genre}
      </Link>
    </li>
  );
}

export default GenreItem;

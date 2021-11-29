import { FILTER_TYPE } from '../../const';
import GenreItem from '../genre-item/genre-item';

type Props = {
  selectedFilter: string;
  onFilterChange: (activeFilter: string) => void;
};

function GenresList({ selectedFilter, onFilterChange }: Props): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {Object.values(FILTER_TYPE).map((genre) => (
        <GenreItem key={`${genre}-${Math.random()}`} genre={genre} selectedFilter={selectedFilter} onButtonClick={onFilterChange} />
      ))}
    </ul>
  );
}

export default GenresList;

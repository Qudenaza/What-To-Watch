import { movieScreenTabs } from '../../const';
import MovieTab from '../movie-tab/movie-tab';

type Props = {
  activeTab: string;
  onClick: (tab: string) => void;
  path: string;
};

function MovieTabs({ activeTab, onClick, path }: Props): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {movieScreenTabs.map((tab) => (
          <MovieTab key={tab} tab={tab} activeTab={activeTab} path={path} onClick={onClick} />
        ))}
      </ul>
    </nav>
  );
}

export default MovieTabs;

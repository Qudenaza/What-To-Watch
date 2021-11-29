import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  path: string;
  tab: string;
  activeTab: string;
  onClick: (tab: string) => void;
};

function MovieTab({ tab, activeTab, path, onClick }: Props): JSX.Element {
  const handleTabClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    onClick(tab);
  };

  return (
    <li className={cn('film-nav__item', { 'film-nav__item--active': activeTab === tab })}>
      <Link to="#" className="film-nav__link" onClick={handleTabClick}>
        {tab}
      </Link>
    </li>
  );
}

export default MovieTab;

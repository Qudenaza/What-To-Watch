import cn from 'classnames';
import PageLogo from '../page-logo/page-logo';
import UserBlock from '../user-block/user-block';

type Props = {
  config: {
    rootPage: boolean;
    myListPage: boolean;
    reviewPage: boolean;
  };
  children?: JSX.Element;
};

function PageHeader({ config, children }: Props): JSX.Element {
  return (
    <header className={cn('page-header', { 'film-card__head': config.rootPage, 'user-page__head': config.myListPage })}>
      <PageLogo />
      {config.myListPage && <h1 className="page-title user-page__title">My list</h1>}
      {config.reviewPage && children}
      <UserBlock />
    </header>
  );
}

export default PageHeader;

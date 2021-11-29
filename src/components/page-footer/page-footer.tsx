import PageLogo from '../page-logo/page-logo';

function PageFooter(): JSX.Element {
  return (
    <footer className="page-footer">
      <PageLogo />
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default PageFooter;

import cn from 'classnames';

type Props = {
  previewUrl: string;
  previewAltText: string;
  config: {
    bigSize: boolean;
    smallSize?: boolean;
  };
};

function MovieCardPreview({ previewUrl, previewAltText, config }: Props): JSX.Element {
  return (
    <div className={cn('film-card__poster', { 'film-card__poster--big': config.bigSize, 'film-card__poster--small': config.smallSize })}>
      <img src={previewUrl} alt={previewAltText} width="218" height="327" />
    </div>
  );
}

export default MovieCardPreview;

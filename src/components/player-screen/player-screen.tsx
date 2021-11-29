import { useRef } from 'react';
import { useSelector } from 'react-redux';
import browserHistory from '../../browser-history';
import { selectMovie } from '../../store/data/selectors';

function PlayerScreen(): JSX.Element {
  const movie = useSelector(selectMovie);
  const player = useRef<HTMLVideoElement>(null);

  const handleExitButtonClick = () => {
    browserHistory.goBack();
  };

  return (
    <div className="player">
      <video src={movie.videoLink} className="player__video" poster={movie.backgroundImage} ref={player} preload="metadata" controls></video>

      <button type="button" className="player__exit" onClick={handleExitButtonClick}>
        Exit
      </button>
    </div>
  );
}

export default PlayerScreen;

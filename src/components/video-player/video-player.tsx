type Props = {
  src: string;
  previewImage: string;
};

function VideoPlayer({ src, previewImage }: Props): JSX.Element {
  return <video src={src} className="player__video" poster={previewImage} muted autoPlay></video>;
}

export default VideoPlayer;

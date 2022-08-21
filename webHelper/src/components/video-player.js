import { bool, func, string } from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = ({
  className, onPlay, playing, thumbnail, url, onClickPreview,
}) => {
  const videoProps = { light: null };

  if (thumbnail) {
    videoProps.light = encodeURI(thumbnail);
  }

  return (
    <div className={className}>
      <ReactPlayer
        {...videoProps}
        stopOnUnmount
        controls
        playing={playing}
        url={encodeURI(url)}
        onPlay={onPlay}
        onClickPreview={onClickPreview}
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  className: string.isRequired,
  onClickPreview: func.isRequired,
  onPlay: func.isRequired,
  playing: bool,
  thumbnail: string,
  url: string.isRequired,
};

VideoPlayer.defaultProps = {
  playing: false,
  thumbnail: null,
};

export default VideoPlayer;

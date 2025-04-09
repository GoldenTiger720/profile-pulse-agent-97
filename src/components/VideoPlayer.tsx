
import React, { useState } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  title: string;
}

const VideoPlayer = ({ videoSrc, posterSrc, title }: VideoPlayerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="relative rounded-lg overflow-hidden w-full h-full min-h-[320px] bg-muted/50">
      {posterSrc && !isLoaded && (
        <img 
          src={posterSrc} 
          alt={title} 
          className="w-full h-full object-cover absolute inset-0"
        />
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Video could not be loaded</p>
        </div>
      ) : (
        <video 
          className="w-full h-full object-cover"
          controls
          poster={posterSrc}
          title={title}
          onLoadedData={handleLoad}
          onError={handleError}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;

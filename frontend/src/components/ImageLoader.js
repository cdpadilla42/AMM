import React, { useEffect, useRef, useState } from 'react';
import { sprites } from '../lib/sprites';

const numOfSprites = sprites.reduce((tally, current) => {
  return (
    tally +
    current.images.reduce((t, c) => {
      return t + 1;
    }, 0)
  );
}, 0);

const ImageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const startTime = useRef(new Date());

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= numOfSprites) {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log('loading', loading);
  //   console.log('numOfSprites', numOfSprites);
  //   if (!loading) {
  //     console.log('started at', startTime.current, 'ended at', new Date());
  //   }
  // }, [loading]);

  const renderHiddenImages = (hideBool) => {
    return sprites.map((animal) => {
      return animal.images.map((spriteObj) => {
        return (
          <img
            src={spriteObj.spriteUrl}
            onLoad={imageLoaded}
            className="hide"
            key={spriteObj.spriteUrl}
          />
        );
      });
    });
  };

  if (loading)
    return (
      <>
        {renderHiddenImages()}
        <p>Loading...</p>
      </>
    );
  return children;
};

export default ImageLoader;

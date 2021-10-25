import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
  const [transitioning, setTransitioning] = useState(true);
  const counter = useRef(0);
  const startTime = useRef(new Date());

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= numOfSprites) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 0);
  }, [loading]);

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
      <StyledImageLoader>
        {renderHiddenImages()}
        <p>Loading...</p>
      </StyledImageLoader>
    );
  return (
    <>
      {transitioning && (
        <StyledImageLoader>
          <p>Loading...</p>
        </StyledImageLoader>
      )}
      {children}
    </>
  );
};

export default ImageLoader;

const StyledImageLoader = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background: rgb(188, 255, 200);
  z-index: 1000;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(188, 255, 200, 1) 40%,
    rgba(0, 212, 255, 1) 100%
  );

  p {
    margin: 0;
  }
`;

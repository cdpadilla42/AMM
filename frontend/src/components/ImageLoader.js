import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { sprites } from '../lib/sprites';

const numOfSprites = sprites.reduce((tally, current) => {
  return (
    tally +
    current.images.reduce((t, c) => {
      return t + 1;
    }, 0)
  );
}, 0);

const ImageLoader = ({ children, disableLoading }) => {
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const counter = useRef(0);
  const startTime = useRef(new Date());
  const location = useLocation();

  useEffect(() => {
    if (disableLoading) {
      setLoading(false);
      setTransitioning(false);
    }
  }, []);
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

  useEffect(() => {
    return () => setLoading(true);
  }, []);

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

  const showLoader = loading || transitioning;

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {showLoader && (
          <motion.div
            className="loader"
            transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] }}
            initial={{ transform: 'translateX(0%)' }}
            exit={{ transform: 'translateX(100%)' }}
            animate={{ transform: 'translateX(0%)' }}
            key={`loader:${location.pathname}`}
          >
            <p>Loading...</p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="loader"
        transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] }}
        initial={{ transform: 'translateX(100%)' }}
        exit={{ transform: 'translateX(0%)' }}
        animate={{ transform: 'translateX(100%)' }}
        key={`loader:${location.pathname}:transition`}
      >
        <p>Loading...</p>
      </motion.div>
      {loading && renderHiddenImages()}
      {children}
    </>
  );
};

export default ImageLoader;

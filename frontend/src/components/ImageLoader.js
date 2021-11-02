import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { sprites } from '../lib/sprites';
import { useSelector } from 'react-redux';

const ImageLoader = ({ children, disableLoading }) => {
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const [sanityDetailsLoaded, setSanityDetailsLoaded] = useState(false);
  const counter = useRef(0);
  const startTime = useRef(new Date());
  const location = useLocation();
  const { loading: dialogueLoading, dialogue: dialogues } = useSelector(
    (state) => state.dialogue
  );
  const { backgroundURL } = useSelector((state) => state.conversations);

  const [animalEmotionsForConversation, numOfSprites] = useMemo(() => {
    if (!sanityDetailsLoaded) return [{}, 0];

    const res = {};
    let numberOfSprites = 0;

    dialogues.forEach((dialogue) => {
      dialogue.phrase.forEach((phrase) => {
        const speaker = phrase.speaker.name;
        const { emotion } = phrase.emotion;
        if (!res[speaker]) {
          res[speaker] = { [emotion]: true };
          numberOfSprites++;
        } else if (!res[speaker][emotion]) {
          res[speaker][emotion] = true;
          numberOfSprites++;
        }
      });
    });
    return [res, numberOfSprites];
  }, [dialogues, sanityDetailsLoaded]);

  console.log(animalEmotionsForConversation, numOfSprites);

  useEffect(() => {
    if (disableLoading) return;
    if (backgroundURL && !dialogueLoading) {
      setSanityDetailsLoaded(true);
      console.log('Sanity data loaded!', new Date());
    }
  }, [dialogueLoading, backgroundURL, disableLoading]);

  useEffect(() => {
    if (disableLoading) {
      setLoading(false);
      setTransitioning(false);
    }
  }, []);

  function rendered() {
    //Render complete
    counter.current += 1;
    if (counter.current >= numOfSprites) {
      setLoading(false);
    }
  }

  function startRender() {
    //Rendering start
    requestAnimationFrame(rendered);
  }

  function loaded() {
    requestAnimationFrame(startRender);
  }

  const imageLoaded = (e) => {
    loaded();
  };

  useEffect(() => {
    if (loading) return;
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      // setLoading(true);
    }, 400);
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
  const sanityImageUrlParams = useMemo(() => {
    const vw = window.innerWidth;
    if (!vw) return;
    return vw <= 420 ? `?w=258&h=284` : `?w=405&h=446`;
  }, []);

  const renderHiddenImages = (hideBool) => {
    return sprites.map((animal) => {
      return animal.images.map((spriteObj) => {
        const optimizedSpriteUrl = `${spriteObj.spriteUrl}${sanityImageUrlParams}`;

        return (
          <img
            src={optimizedSpriteUrl}
            onLoad={imageLoaded}
            className="image_loader_image"
            key={optimizedSpriteUrl}
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
      {renderHiddenImages()}
      {/* {loading && renderHiddenImages()} */}
      {children}
    </>
  );
};

export default ImageLoader;

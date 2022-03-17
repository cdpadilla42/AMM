import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { sprites } from '../lib/sprites';
import PatternedBG from '../imgs/patternedbgs/aabg2.jpg';

// TODO Add animals as Jenn does
const validAnimalSpriteCollections = {
  Katt: true,
  Sterling: true,
  Merengue: true,
};

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
  const { isLoadedFromLocalStorage: act3ScenesDataLoaded } = useSelector(
    (state) => state.act3Scenes
  );

  // Get data from Sanity / Redux when loaded
  const [animalEmotionsForConversation, numOfSprites] = useMemo(() => {
    if (!sanityDetailsLoaded) return [{}, 0];

    const res = {};
    let numberOfSprites = 0;
    const vw = window.innerWidth;

    // Account for main background and, if desktop, the patterned BG
    if (vw <= 420) {
      numberOfSprites = 1;
    } else {
      numberOfSprites = 2;
    }

    dialogues.forEach((dialogue) => {
      if (!dialogue.phrase) return [{}, 0];
      dialogue.phrase.forEach((phrase) => {
        const speaker = phrase.speaker.name;
        const { emotion } = phrase.emotion;
        // TODO Temporary, remove for release
        if (!validAnimalSpriteCollections[speaker]) return;

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

  useEffect(() => {
    if (disableLoading) {
      setLoading(false);
      setTransitioning(false);
    }
  }, []);

  // Wait for the data to load from Sanity into Redux.
  useEffect(() => {
    if (disableLoading) return;
    if (backgroundURL && !dialogueLoading && act3ScenesDataLoaded) {
      setSanityDetailsLoaded(true);
    }
  }, [dialogueLoading, backgroundURL, disableLoading, act3ScenesDataLoaded]);

  // Once it's loaded, we'll handle the image loading based on only images used for this conversation

  // Methods for listening to image rendering
  const rendered = () => {
    //Render complete
    counter.current += 1;
    if (counter.current >= numOfSprites) {
      setLoading(false);
    }
  };

  function startRender() {
    //Rendering start
    requestAnimationFrame(rendered);
  }

  function loaded() {
    requestAnimationFrame(startRender);
  }

  const imageLoaded = (e) => {
    // console.log('loaded this asset: ', e.currentTarget, new Date());
    loaded();
  };

  // Optimize images with Sanity CDN based on window size
  const sanityImageUrlParams = useMemo(() => {
    const vw = window.innerWidth;
    if (!vw) return;
    return vw <= 420 ? `?w=258&h=284` : `?w=405&h=446`;
  }, []);

  // Select which images to render, then return as an array to load into DOM
  const renderHiddenImages = useMemo(
    (hideBool) => {
      if (numOfSprites === 0) return [];
      const vw = window.innerWidth;
      const imagesToRender = [];
      sprites.forEach((animal) => {
        if (!animalEmotionsForConversation[animal.name]) return;
        return animal.images.forEach((spriteObj) => {
          if (
            !animalEmotionsForConversation[animal.name][
              spriteObj.emotion.emotion
            ]
          ) {
            return;
          }

          const optimizedSpriteUrl = `${spriteObj.spriteUrl}${sanityImageUrlParams}`;
          imagesToRender.push(
            <img
              src={optimizedSpriteUrl}
              onLoad={imageLoaded}
              className="image_loader_image"
              key={optimizedSpriteUrl}
            />
          );
        });
      });

      // Add in main BG & Patterned BG
      const sanityBGUrlParams = vw <= 420 ? `` : `?w=755`;

      const fallbackUrl =
        backgroundURL?.backgroundURL?.image?.asset.url + sanityBGUrlParams;
      const desktopUrl = backgroundURL?.backgroundURL?.desktop?.asset.url
        ? backgroundURL?.backgroundURL?.desktop?.asset.url + sanityBGUrlParams
        : fallbackUrl;
      const phoneUrl = backgroundURL?.backgroundURL?.phone?.asset.url
        ? backgroundURL?.backgroundURL?.phone?.asset.url
        : desktopUrl;

      if (vw <= 420) {
        imagesToRender.push(
          <img
            src={phoneUrl}
            onLoad={imageLoaded}
            className="image_loader_image"
            key={phoneUrl + sanityImageUrlParams}
          />
        );
      } else {
        imagesToRender.push(
          <img
            src={desktopUrl}
            onLoad={imageLoaded}
            className="image_loader_image"
            key={desktopUrl + sanityImageUrlParams}
          />
        );
        // patterned bg
        imagesToRender.push(
          <img
            src={PatternedBG}
            onLoad={imageLoaded}
            className="image_loader_image"
            key={PatternedBG}
          />
        );
      }

      return imagesToRender;
    },
    [numOfSprites, animalEmotionsForConversation]
  );

  // Hide loader when all loading is complete. Allow some transition time.
  useEffect(() => {
    if (loading) return;
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      // setLoading(true);
    }, 400);
  }, [loading]);

  // Edges
  useEffect(() => {
    // 1. If loading takes longer than 10 seconds, Go on to the dialogue screen
    setTimeout(() => {
      setTransitioning(false);
      setLoading(false);
    }, 2000);
    // 2. On unmount, reset loading state
    return () => setLoading(true);
  }, []);

  const showLoader = loading || transitioning;

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {showLoader && (
          <motion.div
            className="loader"
            transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] }}
            initial={{ transform: 'translateX(0%)' }}
            exit={{ transform: 'translateX(-100%)' }}
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
        initial={{ transform: 'translateX(-100%)' }}
        exit={{ transform: 'translateX(0%)' }}
        animate={{ transform: 'translateX(-100%)' }}
        key={`loader:${location.pathname}:transition`}
      >
        <p>Loading...</p>
      </motion.div>
      {/* {numOfSprites !== 0 && renderHiddenImages} */}
      {loading && renderHiddenImages}
      {children}
    </>
  );
};

export default ImageLoader;

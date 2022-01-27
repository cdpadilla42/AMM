import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import isEqual from 'lodash.isequal';
import { v4 as uuidv4 } from 'uuid';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import AnimalDisplay from './AnimalDisplay';
import useCurrentSceneObj from '../hooks/useCurrentSceneObj';

const MultipleAnimalDisplay = () => {
  const dialogue = useCurrentDialogueObj() || {};
  const currentConversationUserScene = useCurrentSceneObj();
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);
  const speaker = dialogue.phrase?.[currentDialoguePosition]?.speaker?.name;
  let emotion = dialogue.phrase?.[currentDialoguePosition]?.emotion?.emotion;
  const { ...currentPhraseObj } =
    dialogue.phrase?.[currentDialoguePosition] || {};

  console.log({ speaker, emotion });

  const [animalsState, setAnimalsState] = useState([]);
  const [showMobileOptimizedImages, setShowMobileOptimizedImages] =
    useState(false);
  const { current: lastEmotionRef } = useRef({});

  // dialogue.animals.forEach((animal) => {
  //   console.log({
  //     animal,
  //     emotion: dialogue.phrase[currentDialoguePosition].emotion.emotion,
  //   });
  // });

  // Handles emotions per phrase and animal swaps by dialogue
  useEffect(() => {
    if (currentConversationUserScene.name !== 'Start') {
      setAnimalsState([]);
    }
    handleChangeFromPhrase();
    // return () => {
    //   setAnimalsState([]);
    // };
  }, [
    currentDialoguePosition,
    emotion,
    speaker,
    currentConversationUserScene,
    dialogue,
  ]);

  // Handle Sanity Image URL Optimization based on window width
  useEffect(() => {
    const vw = window.innerWidth;
    if (!vw) return;
    if (vw <= 420) {
      setShowMobileOptimizedImages(true);
    }
  }, []);

  const handleChangeFromPhrase = () => {
    let indexToChange;
    let newState = [...animalsState];
    const newAnimalsInConvo = dialogue?.animals;

    if (!Object.keys(currentPhraseObj).length) return;
    // Store emotions into ref
    newState.forEach((animalObj) => {
      if (animalObj.emotion) {
        lastEmotionRef[animalObj.name] = animalObj.emotion;
      }
    });

    if (speaker === 'Everyone') return;

    if (currentPhraseObj.changePosition) {
      // set the speakers

      // Handle new animals
      if (currentPhraseObj.leftAnimalCentered) {
        newState = [{ name: speaker }];
      } else {
        if (
          currentPhraseObj.leftAnimal &&
          newState[0]?.name !== currentPhraseObj.leftAnimal.name
        ) {
          if (!newState[0]) newState[0] = {};
          newState[0].name = currentPhraseObj.leftAnimal.name;
          if (currentPhraseObj.leftAnimal.name === animalsState[1]?.name) {
            newState[0] = { ...animalsState[1] };
            newState[0].direction = 'right';
          } else if (currentPhraseObj.leftEmotion) {
            newState[0].emotion = currentPhraseObj.leftEmotion.emotion;
          } else {
            // Use ref
            if (lastEmotionRef[newState[0]?.name]) {
              newState[0].emotion = lastEmotionRef[newState[0]?.name];
            }
          }
        }
        if (
          currentPhraseObj.rightAnimal &&
          newState[1]?.name !== currentPhraseObj.rightAnimal.name
        ) {
          if (!newState[1]) newState[1] = {};
          if (currentPhraseObj.rightAnimal.name === animalsState[0]?.name) {
            newState[1] = { ...animalsState[0] };
            newState[1].direction = 'left';
          } else {
            newState[1].name = currentPhraseObj.rightAnimal.name;
            if (currentPhraseObj.rightEmotion) {
              newState[1].emotion = currentPhraseObj.rightEmotion.emotion;
            } else if (lastEmotionRef[newState?.[1]?.name]) {
              // Use ref
              newState[1].emotion = lastEmotionRef[newState[1].name];
            }
          }
        }
      }

      // Handle swapping directions
      newState[0].direction = currentPhraseObj.leftOrientation || 'right';
      if (newState[1])
        newState[1].direction = currentPhraseObj.rightOrientation || 'left';

      if (currentPhraseObj.leftAnimalCentered) {
        const centeredAnimal = currentPhraseObj.leftAnimal?.name || speaker;
        if (newState[0].name === centeredAnimal) {
          newState[0].centered = true;
          if (newState[1]) newState[1].centered = false;
          if (currentPhraseObj.centeredOrientation)
            newState[0].direction = currentPhraseObj.centeredOrientation;
        }
        if (newState[1]?.name === centeredAnimal) {
          newState[1].centered = true;
          newState[0].centered = false;
        }
        // setCenteredView(true);
      } else {
        // setCenteredView(false);
        delete newState[0].centered;
        if (newState[1]) delete newState[1].centered;
      }
    } else if (newAnimalsInConvo) {
      // if there is a dialogue.animals field
      // set the speakers
      if (newAnimalsInConvo.length === 1) return;
      newState.forEach((speaker, i) => {
        if (speaker.name !== newAnimalsInConvo[i].name) {
          newState[i].name = newAnimalsInConvo[i].name;
        }
        newState[i].id = uuidv4();
      });
    }

    indexToChange = newState?.findIndex((animal) => animal.name === speaker);
    if (indexToChange === -1) indexToChange = 0;

    if (!newState[indexToChange]) return;
    // if (isEqual(newState, animalsState)) return;
    setAnimalsState(() => {
      newState[indexToChange].emotion = emotion;
      return newState;
    });

    // Store emotions into ref
    newState.forEach((animalObj) => {
      if (animalObj.emotion) {
        lastEmotionRef[animalObj.ref] = animalObj.emotion;
      }
    });
  };

  const determineTransitionPositioning = (i) => {
    if (i === 0) {
      return 'left';
    } else {
      return 'right';
    }
  };

  return (
    <TransitionGroup
      component="div"
      className="animal_display_transition_group"
    >
      {animalsState.map((animalState, i) => (
        <CSSTransition
          classNames={`animal_transition_${determineTransitionPositioning(i)}`}
          timeout={{ exit: 600, enter: 600 }}
          key={animalState.name}
        >
          <AnimalDisplay
            emotion={animalState.emotion}
            speaker={animalState.name}
            isCurrentSpeaker={animalState.name === speaker}
            orientation={i === 0 ? 'left' : 'right'}
            direction={animalState.direction ?? (i === 0 ? 'right' : 'left')}
            key={animalState.name}
            centered={animalState.centered}
            showMobileOptimizedImages={showMobileOptimizedImages}
          />
        </CSSTransition>
      ))}

      {/* <CSSTransition
        classNames="animal_transition"
        key={'left'}
        timeout={{ exit: 200 }}
      >
        <AnimalDisplay
          emotion={animalsState[0].emotion}
          speaker={animalsState[0].name}
          isCurrentSpeaker={animalsState[0].name === speaker}
          orientation={'left'}
          direction={animalsState[0].direction || 'right'}
          key={animalsState[0].name}
        />
      </CSSTransition>
      <CSSTransition
        classNames="animal_transition"
        key={'right'}
        timeout={{ exit: 200 }}
      >
        <AnimalDisplay
          emotion={animalsState[1].emotion}
          speaker={animalsState[1].name}
          isCurrentSpeaker={animalsState[1].name === speaker}
          orientation={'right'}
          direction={animalsState[1].direction || 'left'}
          key={animalsState[1].name}
        />
      </CSSTransition> */}
    </TransitionGroup>
  );
};

export default MultipleAnimalDisplay;

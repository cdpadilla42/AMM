import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import AnimalDisplay from './AnimalDisplay';

const MultipleAnimalDisplay = () => {
  const dialogue = useCurrentDialogueObj() || {};
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);
  const speaker = dialogue.phrase?.[currentDialoguePosition].speaker.name;
  let emotion = dialogue.phrase?.[currentDialoguePosition].emotion.emotion;
  const { ...currentPhraseObj } = dialogue.phrase?.[currentDialoguePosition];
  const initialState = dialogue?.animals?.map((animal) => {
    const initialAnimal = { ...animal };
    // set initial emotions
    if (animal.name === speaker) {
      initialAnimal.emotion = emotion;
    } else {
      initialAnimal.emotion = 'Standing';
    }
    return initialAnimal;
  });
  const [animalsState, setAnimalsState] = useState(initialState);

  console.log({ currentPhraseObj });

  // dialogue.animals.forEach((animal) => {
  //   console.log({
  //     animal,
  //     emotion: dialogue.phrase[currentDialoguePosition].emotion.emotion,
  //   });
  // });

  // Handles emotions per phrase and animal swaps by dialogue
  useEffect(() => {
    let indexToChange;
    const newState = [...animalsState];
    const newAnimalsInConvo = dialogue?.animals;

    // if the boolean is turned on for swapping positions on the current phrase, reset.
    if (currentPhraseObj.changePosition) {
      // set the speakers
      // TODO Uncomment
      console.log("let's mix it up!");

      // Handle new animals
      if (newState[0].name !== currentPhraseObj.leftAnimal.name) {
        newState[1].name = currentPhraseObj.leftAnimal.name;
      }
      if (newState[0].name !== currentPhraseObj.rightAnimal.name) {
        newState[1].name = currentPhraseObj.rightAnimal.name;
      }

      // Handle swapping directions
      newState[0].direction = currentPhraseObj.leftOrientation || 'right';
      newState[1].direction = currentPhraseObj.rightOrientation || 'left';
    } else if (newAnimalsInConvo) {
      // if there is a dialogue.animals field
      // set the speakers
      newState.forEach((speaker, i) => {
        if (speaker.name !== newAnimalsInConvo[i].name) {
          newState[i].name = newAnimalsInConvo[i].name;
        }
      });
    }

    indexToChange = animalsState?.findIndex(
      (animal) => animal.name === speaker
    );
    setAnimalsState(() => {
      newState[indexToChange].emotion = emotion;
      return newState;
    });
  }, [currentDialoguePosition, emotion, speaker]);

  const renderAnimals = () =>
    animalsState.map((animal, index) => {
      let orientation;
      if (index === 0) orientation = 'left';
      if (index === 1) orientation = 'right';
      return (
        <AnimalDisplay
          emotion={animal.emotion}
          speaker={animal.name}
          orientation={orientation}
          key={animal.name}
        />
      );
    });

  return (
    <>
      <AnimalDisplay
        emotion={animalsState[0].emotion}
        speaker={animalsState[0].name}
        isCurrentSpeaker={animalsState[0].name === speaker}
        orientation={'left'}
        direction={animalsState[0].direction || 'right'}
        key={animalsState[0].name}
      />
      <AnimalDisplay
        emotion={animalsState[1].emotion}
        speaker={animalsState[1].name}
        isCurrentSpeaker={animalsState[1].name === speaker}
        orientation={'right'}
        direction={animalsState[1].direction || 'left'}
        key={animalsState[1].name}
      />
    </>
  );
};

export default MultipleAnimalDisplay;

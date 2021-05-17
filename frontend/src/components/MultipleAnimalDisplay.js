import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import AnimalDisplay from './AnimalDisplay';

const MultipleAnimalDisplay = () => {
  const dialogue = useCurrentDialogueObj();
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);
  const speaker = dialogue.phrase[currentDialoguePosition].speaker.name;
  let emotion = dialogue.phrase[currentDialoguePosition].emotion.emotion;
  const initialState = dialogue?.animals?.map((animal) => {
    const initialAnimal = { ...animal };
    if (animal.name === speaker) {
      initialAnimal.emotion = emotion;
    } else {
      initialAnimal.emotion = 'Standing';
    }
    return initialAnimal;
  });
  const [animalsState, setAnimalsState] = useState(initialState);

  // dialogue.animals.forEach((animal) => {
  //   console.log({
  //     animal,
  //     emotion: dialogue.phrase[currentDialoguePosition].emotion.emotion,
  //   });
  // });

  useEffect(() => {
    const indexToChange = animalsState?.findIndex(
      (animal) => animal.name === speaker
    );
    console.log({ indexToChange });
    setAnimalsState((prevState) => {
      console.log({ prevState });
      const newState = [...prevState];
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
        orientation={'left'}
        key={animalsState[0].name}
      />
      <AnimalDisplay
        emotion={animalsState[1].emotion}
        speaker={animalsState[1].name}
        orientation={'right'}
        key={animalsState[1].name}
      />
    </>
  );
};

export default MultipleAnimalDisplay;

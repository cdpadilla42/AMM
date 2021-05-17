import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import AnimalDisplay from './AnimalDisplay';
import MultipleAnimalDisplay from './MultipleAnimalDisplay';

const AnimalsDisplayController = () => {
  const dialogue = useCurrentDialogueObj();
  const animalsFromDialouge = dialogue?.animals;
  const [isMultiAnimalConvo, setIsMultiAnimalConvo] = useState(
    !!dialogue?.animals?.length
  );

  useEffect(() => {
    if (isMultiAnimalConvo !== !!dialogue.animals?.length) {
      setIsMultiAnimalConvo(!!dialogue.animals?.length);
    }
  }, [dialogue]);
  if (isMultiAnimalConvo) {
    console.log('Two can play at that!');
    // control the changing of speaker emotion
    return <MultipleAnimalDisplay />;
  }

  // If only one animal in dialogue, return
  return <AnimalDisplay />;
};

export default AnimalsDisplayController;

// Set State - single or multiple conversation
// if multiple, lay out the animals
// set initial state at a controller level of animal name and emotion
// listen for the dialogue position to change
// When it does, find which animal is currently speaking
// if it's them, change their emotion

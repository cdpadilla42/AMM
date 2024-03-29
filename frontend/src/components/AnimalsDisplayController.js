import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import AnimalDisplay from './AnimalDisplay';
import MultipleAnimalDisplay from './MultipleAnimalDisplay';

const AnimalsDisplayController = () => {
  const dialogue = useCurrentDialogueObj();
  const animalsFromDialouge = dialogue?.animals;
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);

  // const [isMultiAnimalConvo, setIsMultiAnimalConvo] = useState(
  //   !!dialogue?.animals?.length ||
  //     dialogue?.phrase[currentDialoguePosition]?.leftAnimalCentered
  // );

  // useEffect(() => {
  //   // if (!animalsFromDialouge) return;
  //   if (
  //     animalsFromDialouge &&
  //     isMultiAnimalConvo !== !!dialogue.animals?.length
  //   ) {
  //     setIsMultiAnimalConvo(!!dialogue.animals?.length);
  //   }
  //   if (dialogue.phrase[currentDialoguePosition].changePosition) {
  //     // If set on the phrase, defer to letting the multi animal component handle
  //     if (dialogue.phrase[currentDialoguePosition].leftAnimalCentered) {
  //       return;
  //     }
  //     if (!dialogue.phrase[currentDialoguePosition].rightAnimal) {
  //       setIsMultiAnimalConvo(false);
  //     } else {
  //       setIsMultiAnimalConvo(true);
  //     }
  //   }
  // }, [dialogue, currentDialoguePosition]);

  // if (isMultiAnimalConvo) {
  // control the changing of speaker emotion
  return <MultipleAnimalDisplay />;
  // }

  // If only one animal in dialogue, return
  //   return (
  //     <TransitionGroup
  //       component="div"
  //       className="animal_display_transition_group"
  //     >
  //       <CSSTransition
  //         classNames={`animal_transition_left`}
  //         key={dialogue.phrase[currentDialoguePosition].speaker.name}
  //         timeout={{ exit: 600, enter: 60000 }}
  //       >
  //         <AnimalDisplay
  //           key={dialogue.phrase[currentDialoguePosition].speaker.name}
  //         />
  //       </CSSTransition>
  //     </TransitionGroup>
  //   );
};

export default AnimalsDisplayController;

// Set State - single or multiple conversation
// if multiple, lay out the animals
// set initial state at a controller level of animal name and emotion
// listen for the dialogue position to change
// When it does, find which animal is currently speaking
// if it's them, change their emotion
// set initial state at a controller level of animal name and emotion
// listen for the dialogue position to change
// When it does, find which animal is currently speaking
// if it's them, change their emotion

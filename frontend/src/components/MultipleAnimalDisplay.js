import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import AnimalDisplay from './AnimalDisplay';

const MultipleAnimalDisplay = () => {
  const dialogue = useCurrentDialogueObj() || {};
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);
  const speaker = dialogue.phrase?.[currentDialoguePosition].speaker.name;
  let emotion = dialogue.phrase?.[currentDialoguePosition].emotion.emotion;
  const { ...currentPhraseObj } = dialogue.phrase?.[currentDialoguePosition];
  const initialState = useMemo(() => {
    const initialAnimalFromPhrase = [];
    if (dialogue.phrase[currentDialoguePosition].leftAnimal) {
      initialAnimalFromPhrase.push(
        dialogue.phrase[currentDialoguePosition].leftAnimal
      );
    } else {
      initialAnimalFromPhrase.push({ name: speaker });
    }
    if (dialogue?.phrase[currentDialoguePosition].rightAnimal) {
      initialAnimalFromPhrase.push(
        dialogue?.phrase[currentDialoguePosition].rightAnimal
      );
    }
    console.log(initialAnimalFromPhrase);
    return initialAnimalFromPhrase.map((animal) => {
      const initialAnimal = { ...animal };
      // set initial emotions
      if (animal.name === speaker) {
        initialAnimal.emotion = emotion;
      } else {
        initialAnimal.emotion = 'Standing';
      }
      return initialAnimal;
    });
  }, []);

  const [animalsState, setAnimalsState] = useState(initialState);
  const [centeredView, setCenteredView] = useState(false);

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
    let newState = [...animalsState];
    const newAnimalsInConvo = dialogue?.animals;

    if (currentPhraseObj.changePosition) {
      // set the speakers
      // TODO Uncomment
      console.log("let's mix it up!");

      // Handle new animals
      if (currentPhraseObj.leftAnimalCentered) {
        newState = [];
        newState = [{ name: speaker }];
      } else {
        if (newState[0].name !== currentPhraseObj.leftAnimal.name) {
          newState[0].name = currentPhraseObj.leftAnimal.name;
        }
        if (
          currentPhraseObj.rightAnimal &&
          newState[1]?.name !== currentPhraseObj.rightAnimal.name
        ) {
          if (!newState[1]) newState[1] = {};
          newState[1].name = currentPhraseObj.rightAnimal.name;
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
        }
        if (newState[1]?.name === centeredAnimal) {
          newState[1].centered = true;
          newState[0].centered = false;
        }
        setCenteredView(true);
      } else {
        setCenteredView(false);
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
      });
    }

    indexToChange = newState?.findIndex((animal) => animal.name === speaker);
    console.log({ indexToChange, newState, speaker });
    setAnimalsState(() => {
      newState[indexToChange].emotion = emotion;
      return newState;
    });

    return () => {
      setAnimalsState([]);
    };
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
    <TransitionGroup
      component="div"
      className="animal_display_transition_group"
    >
      {animalsState.map(
        (animalState, i) =>
          !(animalState.centered === false) && (
            <CSSTransition
              classNames={`animal_transition_${i === 0 ? 'left' : 'right'}`}
              key={animalState.name}
              timeout={{ exit: 600, enter: 60000 }}
            >
              <AnimalDisplay
                emotion={animalState.emotion}
                speaker={animalState.name}
                isCurrentSpeaker={animalState.name === speaker}
                orientation={i === 0 ? 'left' : 'right'}
                direction={
                  animalState.direction ?? (i === 0 ? 'right' : 'left')
                }
                key={animalState.name}
                centered={animalState.centered}
              />
            </CSSTransition>
          )
      )}

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

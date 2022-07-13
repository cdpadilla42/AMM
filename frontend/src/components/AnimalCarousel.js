import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AnimalDisplay from './AnimalDisplay';

const carouselData = [
  {
    centered: true,
    emotion: 'Pride',
    direction: 'left',
    name: 'Agent S',
  },
  {
    centered: true,
    emotion: 'notebook',
    direction: 'left',
    name: 'Agent S',
  },
  {
    centered: true,
    emotion: 'Smirking',
    direction: 'left',
    name: 'Agent S',
  },
  // {
  //   centered: true,
  //   emotion: 'Thought',
  //   direction: 'left',
  //   name: 'Agent S',
  // },
  // {
  //   centered: true,
  //   emotion: 'Sweat',
  //   direction: 'left',
  //   name: 'Agent S',
  // },
  // {
  //   centered: true,
  //   emotion: 'Surprise',
  //   direction: 'left',
  //   name: 'Agent S',
  // },
];

const AnimalCarousel = () => {
  const speaker = 'Agent S';

  // const [animalsState, setAnimalsState] = useState(carouselData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const animalsState = [carouselData[currentIndex]];

  // Handle Sanity Image URL Optimization based on window width
  useEffect(() => {
    const vw = window.innerWidth;
    if (!vw) return;
    if (vw <= 420) {
      // setShowMobileOptimizedImages(true);
    }
  }, []);

  const nextImage = () => {
    setCurrentIndex((currentState) => {
      if (currentState === carouselData.length - 1) {
        return 0;
      }
      return currentState + 1;
    });
  };

  // set carousel timer
  useEffect(() => {
    // Do that
    const intervalID = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <TransitionGroup
      component="div"
      className="animal_display_transition_group"
    >
      {animalsState.map((animalState, i) => (
        <CSSTransition
          classNames={`animal_transition_left`}
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
            showMobileOptimizedImages={true}
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

export default AnimalCarousel;

import React from 'react';
import { useSelector } from 'react-redux';
import normal from '../imgs/normal.png';
import mad from '../imgs/mad.png';
import laugh from '../imgs/laugh.png';
import sad from '../imgs/sad.png';
import sleep from '../imgs/sleep.png';

const AnimalDisplay = () => {
  let emotion = useSelector(
    (state) => state.dialogue[state.currentDialoguePosition][1]
  );

  const animalImages = {
    normal,
    mad,
    laugh,
    sad,
    sleep,
  };

  if (!animalImages[emotion]) emotion = 'normal';

  return (
    <div className="game_container__animal">
      <img
        src={animalImages[emotion]}
        alt=""
        className="game_container__animal_image"
      />
    </div>
  );
};

export default AnimalDisplay;

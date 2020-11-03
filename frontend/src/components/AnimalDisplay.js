import React from 'react';
import { useSelector } from 'react-redux';
import normal from '../imgs/normal.png';

const AnimalDisplay = () => {
  const emotion = useSelector(
    (state) => state.dialogue[state.currentDialoguePosition][1]
  );

  console.log(emotion);

  return (
    <div className="game_container__animal">
      <img src={normal} alt="" className="game_container__animal_image" />
    </div>
  );
};

export default AnimalDisplay;

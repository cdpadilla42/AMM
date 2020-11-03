import React from 'react';
import { useSelector } from 'react-redux';
import normal from '../imgs/normal.png';

const AnimalDisplay = () => {
  const textFromRedux = useSelector((state) => state.text);

  console.log(textFromRedux);

  return (
    <div className="game_container__animal">
      <img src={normal} alt="" className="game_container__animal_image" />
    </div>
  );
};

export default AnimalDisplay;

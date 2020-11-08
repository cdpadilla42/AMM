import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnimalDisplay from '../components/AnimalDisplay';
import { getDialogue, resetDialoguePosition } from '../store/dialogue';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import '../styles/testimony.css';

const Testimony = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDialogue(props.match.params.id));
    // set place to 0
    dispatch(resetDialoguePosition());
  }, []);

  return (
    <div className="container">
      <Nav />
      <div className="game_container">
        <AnimalDisplay />
        <TextBox />
      </div>
    </div>
  );
};

export default Testimony;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnimalDisplay from '../components/AnimalDisplay';
import { getDialogue } from '../store/dialogue';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import '../styles/testimony.css';

const Testimony = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDialogue(props.match.params.id));
  }, [dispatch]);

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

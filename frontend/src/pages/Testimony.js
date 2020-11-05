import styled from 'styled-components';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import '../styles/testimony.css';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import sanityClient from '../client';
import AnimalDisplay from '../components/AnimalDisplay';
import { getDialogue } from '../store/dialogue/reducer';

const Testimony = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDialogue());
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

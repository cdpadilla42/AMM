import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimalDisplay from '../components/AnimalDisplay';
import { getDialogue, resetDialoguePosition } from '../store/dialogue';
import { getInventoryItems, getAnimalNotes } from '../store/inventory';
import { getSprites } from '../store/sprites';
import { getBackground } from '../store/conversations';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import ResponseBox from '../components/ResponseBox';
import Inventory from '../components/Inventory';
import styled from 'styled-components';
import '../styles/testimony.css';

const StyledContainer = styled.div`
  background-image: url(${(props) => props.background});
`;

const Testimony = (props) => {
  const dispatch = useDispatch();
  const isInventoryOpen = useSelector(
    (state) => state.dialogue.isInventoryOpen
  );
  const backgroundURL = useSelector(
    (state) =>
      state.conversations?.conversations?.backgroundURL?.image.asset.url
  );

  useEffect(() => {
    dispatch(getDialogue(props.match.params.id));
    dispatch(getBackground(props.match.params.id));
    dispatch(getSprites());
    // set place to 0
    dispatch(resetDialoguePosition());
  }, []);

  // Get items for inventory & Animal notes
  useEffect(() => {
    dispatch(getInventoryItems());
    dispatch(getAnimalNotes());
  }, []);

  // on load, set local storage
  useEffect(() => {
    const { localStorage } = window;
    const itemsInInventory = {
      items: ['The Prophecy'],
      act: 2,
    };
    localStorage.setItem('itemsInInventory', JSON.stringify(itemsInInventory));
  }, []);

  return (
    <StyledContainer
      className="container"
      background={backgroundURL || 'https://wallpapercave.com/wp/wp2586787.jpg'}
    >
      <Nav />
      <div className="game_container">
        <AnimalDisplay />
        {isInventoryOpen && <Inventory />}
        <ResponseBox />
        <TextBox />
      </div>
    </StyledContainer>
  );
};

export default Testimony;

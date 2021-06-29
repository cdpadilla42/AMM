import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimalDisplay from '../components/AnimalDisplay';
import { getDialogue, resetDialoguePosition } from '../store/dialogue';
import { getInventoryItems, getAnimalNotes } from '../store/inventory';
import { getSprites } from '../store/sprites';
import { getBackground, getConversationDetails } from '../store/conversations';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import ResponseBox from '../components/ResponseBox';
import Inventory from '../components/Inventory';
import styled from 'styled-components';
import '../styles/testimony.css';
import AnimalsDisplayController from '../components/AnimalsDisplayController';
import ImageLoader from '../components/ImageLoader';

const Testimony = (props) => {
  const dispatch = useDispatch();
  const isInventoryOpen = useSelector(
    (state) => state.dialogue.isInventoryOpen
  );
  const backgroundURLs = useSelector(
    (state) => state.conversations?.backgroundURL?.backgroundURL
    // state.conversations?.backgroundURL?.backgroundURL?.image.asset.url
  );

  useEffect(() => {
    dispatch(getDialogue(props.match.params.id));
    dispatch(getBackground(props.match.params.id));
    dispatch(getConversationDetails(props.match.params.id));
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
    <ImageLoader>
      <StyledContainer
        className="container"
        fallback={backgroundURLs?.image?.asset.url}
        desktop={backgroundURLs?.desktop?.asset.url}
        phone={backgroundURLs?.phone?.asset.url}
        tablet={backgroundURLs?.tablet?.asset.url}
      >
        <Nav />
        <div className="game_container">
          <AnimalsDisplayController />
          {isInventoryOpen && <Inventory />}
          <ResponseBox />
          <TextBox />
        </div>
      </StyledContainer>
    </ImageLoader>
  );
};

const StyledContainer = styled.div`
  background-image: url(${(props) => props.desktop || props.fallback});

  @media all and (max-width: 1024px) {
    background-image: url(${(props) => props.tablet || props.fallback});
  }

  @media all and (max-width: 420px) {
    background-image: url(${(props) => props.phone || props.fallback});
  }
`;

export default Testimony;

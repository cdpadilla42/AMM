import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimalDisplay from '../components/AnimalDisplay';
import { getDialogue, resetDialoguePosition } from '../store/dialogue';
import {
  getInventoryItems,
  getAnimalNotes,
  getSNotes,
  initializeUserInventoryFromLocalStorage,
} from '../store/inventory';
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
import PatternedBG from '../imgs/video-game-controller-gamepads-seamless-pattern-flat-style-illustrations-71807888.jpeg';
import SNotes from '../components/SNotes';

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

  // Get items for inventory, Animal notes & Agent S Notes
  useEffect(() => {
    dispatch(getInventoryItems());
    dispatch(getAnimalNotes());
    dispatch(getSNotes());
    dispatch(initializeUserInventoryFromLocalStorage());
  }, []);

  return (
    <ImageLoader>
      <SNotes />
      <StyledContainer
        className="container"
        fallback={backgroundURLs?.image?.asset.url}
        desktop={backgroundURLs?.desktop?.asset.url}
        phone={backgroundURLs?.phone?.asset.url}
        tablet={backgroundURLs?.tablet?.asset.url}
        PatternedBG={PatternedBG}
      >
        <div className="desktop_main_background" />
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
  background-image: url(${PatternedBG});
  background-repeat: repeat;

  /* background-repeat: no-repeat;
  background-size: 755px 765px; */

  .desktop_main_background {
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    // TODO show none if no props.desktop
    background-image: url(${(props) => props.desktop || props.fallback});
    background-size: 755px 765px;

    @media all and (max-width: 1024px) {
      display: none;
    }
  }

  @media all and (max-width: 1024px) {
    background-image: url(${(props) => props.tablet || props.fallback});
    background-size: initial;
  }

  /* Comment below option for sideways tablets */
  /* @media all and (min-height: 800px), all and (max-width: 1370px) { */
  @media all and (max-width: 1024px) {
    background-image: url(${(props) => props.tablet || props.fallback});
    background-size: initial;
  }

  @media all and (max-width: 420px) {
    background-image: url(${(props) => props.phone || props.fallback});
    background-size: initial;
  }

  @media all and (min-width: 400px) and (max-width: 500px) {
    background-size: cover;
  }
`;

export default Testimony;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import throttle from 'lodash.throttle';
import AnimalDisplay from '../components/AnimalDisplay';
import {
  clearDialogueData,
  getDialogue,
  resetDialoguePosition,
} from '../store/dialogue';
import {
  getInventoryItems,
  getAnimalNotes,
  getSNotes,
  initializeUserInventoryFromLocalStorage,
  getMapLocations,
} from '../store/inventory';
import { getSprites } from '../store/sprites';
import { getBackground, getConversationDetails } from '../store/conversations';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import ResponseBox from '../components/ResponseBox';
import Inventory from '../components/Inventory';
import HealthBar from '../components/HealthBar';
import styled from 'styled-components';
import '../styles/testimony.css';
import AnimalsDisplayController from '../components/AnimalsDisplayController';
import ImageLoader from '../components/ImageLoader';
import PatternedBG from '../imgs/patternedbgs/aabg2.jpg';
import SNotes from '../components/SNotes';
import { closeSNotes } from '../store/notepad';
import TestimonyImage from '../components/TestimonyImage';

const Testimony = (props) => {
  const dispatch = useDispatch();
  const isInventoryOpen = useSelector(
    (state) => state.dialogue.isInventoryOpen
  );
  const backgroundURLs = useSelector(
    (state) => state.conversations?.backgroundURL?.backgroundURL
  );
  const showingHealthBar = useSelector(
    (state) => state.health.showingHealthBar
  );

  useEffect(() => {
    // set place to 0
    dispatch(resetDialoguePosition());
    dispatch(getDialogue(props.match.params.id));
    dispatch(getBackground(props.match.params.id));
    dispatch(getConversationDetails(props.match.params.id));

    return () => {
      dispatch(clearDialogueData());
      dispatch(closeSNotes());
    };
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
          <div className="inventory_wrapper">
            <Inventory />
          </div>
          <div className="health_bar_wrapper">
            <div
              className={`health_bar_inset${
                showingHealthBar ? '' : ' offscreen'
              }`}
            >
              <HealthBar />
            </div>
          </div>
          <TestimonyImage />
          <ResponseBox />
          {!isInventoryOpen && <TextBox />}
        </div>
      </StyledContainer>
    </ImageLoader>
  );
};

const StyledContainer = styled.div`
  /* background: rgb(188,255,200);
  background: linear-gradient(90deg, rgba(188,255,200,1) 35%, rgba(0,212,255,1) 100%); */
  background-image: url(${PatternedBG});
  background-repeat: repeat;

  /* background-repeat: no-repeat;
  background-size: 755px 765px; */

  .desktop_main_background {
    width: 755px;
    height: 765px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    // TODO show none if no props.desktop
    background: rgb(188, 221, 200)
      url(${(props) => props.desktop || props.fallback});
    background-size: cover;
    border: 1px solid #8193e3;

    @media all and (max-width: 420px) {
      display: none;
    }
  }

  /* Comment below option for sideways tablets */
  /* @media all and (min-height: 800px), all and (max-width: 1370px) { */

  /* BELOW => Tablet settings */
  /* @media all and (max-width: 1024px) {
    background-image: url(${(props) => props.tablet || props.fallback});
    background-size: initial;
  } */

  @media all and (max-width: 420px) {
    background-image: url(${(props) => props.phone || props.fallback});
    background-size: initial;
  }

  @media all and (min-width: 400px) and (max-width: 500px) {
    background-size: cover;
  }
`;

export default Testimony;

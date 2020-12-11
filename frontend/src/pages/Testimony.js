import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimalDisplay from '../components/AnimalDisplay';
import { getDialogue, resetDialoguePosition } from '../store/dialogue';
import { getInventoryItems, getAnimalNotes } from '../store/inventory';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import ResponseBox from '../components/ResponseBox';
import Inventory from '../components/Inventory';
import Map from '../components/Map';
import '../styles/testimony.css';

const Testimony = (props) => {
  const dispatch = useDispatch();
  const isInventoryOpen = useSelector(
    (state) => state.dialogue.isInventoryOpen
  );
  const isMapOpen = useSelector((state) => state.dialogue.isMapOpen);

  useEffect(() => {
    dispatch(getDialogue(props.match.params.id));
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
    <div className="container">
      <Nav />
      <div className="game_container">
        <AnimalDisplay />
        {isInventoryOpen && <Inventory />}
        {/* {isMapOpen && <Map />} */}
        <ResponseBox />
        <TextBox />
      </div>
    </div>
  );
};

export default Testimony;

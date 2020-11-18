import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleInventory } from '../store/dialogue';
import extractCurrentDialogueObj from '../lib/extractCurrentDialogueObj';

const StyledInventory = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  height: 50%;
  z-index: 6;
  border: 1px solid black;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
  background-color: palegoldenrod;
  border-radius: 5px;

  div {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0;
    background-color: #fff;
  }

  img {
    width: 100px;
    height: 100px;
  }

  span {
    display: block;
    flex: 1;
  }
`;

const Inventory = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const { currentDialogueID, dialogue } = useSelector(
    (state) => state.dialogue
  );

  const requiredEvidence = extractCurrentDialogueObj(
    currentDialogueID,
    dialogue
  ).requiredEvidence.name;
  console.log(requiredEvidence, 'Inventory');

  // const inventory = useSelector((store) => store.inventory);
  // console.log(inventory);
  const dummyInventory = new Array(6);
  dummyInventory.fill({
    name: 'horse',
    image: 'https://f4.bcbits.com/img/a3261223391_2.jpg',
    description: 'What a noble steed.',
  });
  dummyInventory[4] = {
    name: 'The Prophecy',
    image: 'https://f4.bcbits.com/img/a3261223391_2.jpg',
    description: 'What a noble steed.',
  };

  function displayItemDetails(e) {
    const itemName = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.name);
    setSelectedItem(itemName);
    setIsDetailsOpen(true);
  }

  function renderInventory() {
    return dummyInventory.map((item) => {
      return (
        <div key={item.name} data-name={item.name} onClick={displayItemDetails}>
          <img src={item.image} alt="" />
          <span>{item.name}</span>
        </div>
      );
    });
  }
  return (
    <>
      {isDetailsOpen ? (
        <ItemDetailsDisplay
          selectedItem={selectedItem}
          inventory={dummyInventory}
          setIsDetailsOpen={setIsDetailsOpen}
          requiredEvidence={requiredEvidence}
        />
      ) : (
        <StyledInventory>{renderInventory()}</StyledInventory>
      )}
    </>
  );
};

const StyledItemDetailsDisplay = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  height: 50%;
  z-index: 6;
  border: 1px solid black;
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  grid-template-columns: 200px 1fr;
  background-color: palegoldenrod;
  border-radius: 5px;

  img {
    width: 200px;
    height: 200px;
  }

  h4 {
    margin: 0;
    padding: 0;
  }
`;

const ItemDetailsDisplay = ({
  selectedItem,
  inventory,
  setIsDetailsOpen,
  requiredEvidence,
}) => {
  const itemObj = inventory.find((item) => item.name === selectedItem);
  const dispatch = useDispatch();

  function closeDetailsDisplay() {
    setIsDetailsOpen(false);
  }

  function presentItem() {
    console.log(itemObj);
    if (itemObj.name === requiredEvidence) {
      console.log('you did it!');
    } else {
      console.log('Soooorrry, wrong one');
    }
    closeDetailsDisplay();
    dispatch(toggleInventory());
  }

  return (
    <StyledItemDetailsDisplay>
      <img src={itemObj.image} alt="" />
      <div className="written_details">
        <h4>{itemObj.name}</h4>
        <p>{itemObj.description}</p>
        <button onClick={presentItem}>Present</button>
        <button onClick={closeDetailsDisplay}>Close</button>
      </div>
    </StyledItemDetailsDisplay>
  );
};

export default Inventory;

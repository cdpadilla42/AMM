import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleInventory, switchConversation } from '../store/dialogue';
import extractCurrentDialogueObj from '../lib/extractCurrentDialogueObj';

const StyledInventory = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  height: 350px;
  z-index: 6;
  border: 1px solid black;
  padding: 1rem;
  background-color: palegoldenrod;
  border-radius: 5px;

  .inventory_header {
    width: 100%;
    border: 1px solid black;
  }

  .inventory_grid {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    height: calc(100% - 2rem);
    width: 100%;
  }

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
    width: 80px;
    height: 80px;
  }

  span {
    display: block;
    flex: 1;
  }
`;

const dummyInventory = [
  {
    name: 'horse',
    image: 'https://f4.bcbits.com/img/a3261223391_2.jpg',
    description: 'What a noble steed.',
  },
  {
    name: 'john',
    image: 'https://f4.bcbits.com/img/a3261223391_2.jpg',
    description: 'What a noble steed.',
  },
  {
    name: 'The Prophecy',
    image: 'https://f4.bcbits.com/img/a3261223391_2.jpg',
    description: 'What a noble steed.',
  },
];

const dummyAnimalNotes = [
  {
    name: 'Brian',
    imageUrl: 'https://f4.bcbits.com/img/a0905339103_16.jpg',
    description: 'What a noble steed.',
  },
  {
    name: 'John',
    imageUrl: 'https://f4.bcbits.com/img/a0905339103_16.jpg',
    description: 'What a noble steed.',
  },
  {
    name: 'Lucy',
    imageUrl: 'https://f4.bcbits.com/img/a0905339103_16.jpg',
    description: 'What a noble steed.',
  },
];

const Inventory = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isShowingPeople, setIsShowingPeople] = useState(false);
  const [items, setItems] = useState(dummyInventory);
  const { currentDialogueID, dialogue } = useSelector(
    (state) => state.dialogue
  );
  const fullItemsInventory = useSelector((store) => store.inventory.items);
  const currentDialogueObj = extractCurrentDialogueObj(
    currentDialogueID,
    dialogue
  );

  const requiredEvidence = currentDialogueObj.requiredEvidence.name;
  const nextResponseID =
    currentDialogueObj.responseOptions[0].followingDialogue._id;

  function displayItemDetails(e) {
    const itemName = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.name);
    setSelectedItem(itemName);
    setIsDetailsOpen(true);
  }

  function toggleShowingPeople() {
    setItems(!isShowingPeople ? dummyAnimalNotes : dummyInventory);
    setIsShowingPeople(!isShowingPeople);
  }

  function selectUserItemsFromFullInventory() {
    const userItemsInventory = JSON.parse(
      window.localStorage.getItem('itemsInInventory')
    ).items;
    console.log('fullItemsInventory', fullItemsInventory);
    console.log('userItemsInventory', userItemsInventory);
    return fullItemsInventory.filter((item) => {
      return userItemsInventory.includes(item.name);
    });
  }

  function renderInventory() {
    const selectedItems = isShowingPeople
      ? dummyAnimalNotes
      : selectUserItemsFromFullInventory();
    const jsx = selectedItems.map((item) => {
      // TODO Add sanity image url builder to import a smaller image size
      return (
        <div key={item.name} data-name={item.name} onClick={displayItemDetails}>
          <img src={item.imageUrl} alt="" />
          <span>{item.name}</span>
        </div>
      );
    });

    console.log(jsx);
    return jsx;
  }
  return (
    <>
      {isDetailsOpen ? (
        <ItemDetailsDisplay
          selectedItem={selectedItem}
          inventory={items}
          setIsDetailsOpen={setIsDetailsOpen}
          requiredEvidence={requiredEvidence}
          nextResponseID={nextResponseID}
        />
      ) : (
        <StyledInventory>
          <div className="inventory_header">
            <button onClick={toggleShowingPeople}>
              {isShowingPeople ? 'Animals' : 'Items'}
            </button>
          </div>
          <div className="inventory_grid">{renderInventory()}</div>
        </StyledInventory>
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
  nextResponseID,
}) => {
  const itemObj = inventory.find((item) => item.name === selectedItem);
  const dispatch = useDispatch();

  function closeDetailsDisplay() {
    setIsDetailsOpen(false);
  }

  function presentItem() {
    console.log(itemObj);
    if (itemObj.name === requiredEvidence) {
      dispatch(switchConversation(nextResponseID));
      closeDetailsDisplay();
      dispatch(toggleInventory());
    } else {
      console.log('Soooorrry, wrong one');
      closeDetailsDisplay();
    }
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

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';
import {
  toggleInventory,
  switchConversation,
  toggleMap,
  displayInvalidEvidenceDialogue,
} from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import urlFor from '../lib/imageUrlBuilder';
import Map from './Map';

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
    text-align: center;
  }

  .inventory_grid {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    height: calc(100% - 2rem);
    width: 100%;
    overflow-y: scroll;
  }

  div {
    border: 1px solid black;
    /* display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; */
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

  button {
    display: inline;
  }
`;

const Inventory = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isShowingPeople, setIsShowingPeople] = useState(false);
  const dispatch = useDispatch();

  const isMapOpen = useSelector((state) => state.dialogue.isMapOpen);
  const fullItemsInventory = useSelector((store) => store.inventory.items);
  const animalNotes = useSelector((store) => store.inventory.notes);
  const currentDialogueObj = useCurrentDialogueObj();

  const requiredEvidence = currentDialogueObj.requiredEvidence;
  const nextResponseID =
    currentDialogueObj.responseOptions[0].followingDialogue._id;

  function displayItemDetails(e) {
    const itemName = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.name);
    setSelectedItem(itemName);
    setIsDetailsOpen(true);
  }

  function toggleShowingPeople() {
    setIsShowingPeople(!isShowingPeople);
  }

  // * NOTE: We have the ability to filter based on what's in the user's inventory!
  // * It's this function
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
    const selectedItems = isShowingPeople ? animalNotes : fullItemsInventory;
    const jsx = selectedItems.map((item) => {
      return (
        <div key={item.name} data-name={item.name} onClick={displayItemDetails}>
          <img
            src={urlFor(item.imageUrl).width(200).height(200).url()}
            alt=""
          />
          <span>{item.name}</span>
        </div>
      );
    });

    return jsx;
  }
  return (
    <>
      {isDetailsOpen ? (
        <ItemDetailsDisplay
          selectedItem={selectedItem}
          inventory={isShowingPeople ? animalNotes : fullItemsInventory}
          setIsDetailsOpen={setIsDetailsOpen}
          requiredEvidence={requiredEvidence}
          nextResponseID={nextResponseID}
        />
      ) : (
        <StyledInventory>
          <div className="inventory_header">
            <button onClick={toggleShowingPeople}>
              {isShowingPeople ? 'Items' : 'Animals'}
            </button>
            <button onClick={() => dispatch(toggleMap())}>Map</button>
          </div>
          {isMapOpen ? (
            <Map />
          ) : (
            <div className="inventory_grid">{renderInventory()}</div>
          )}
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
  const act = useSelector((store) => store.conversations.conversation?.[0].act);

  function closeDetailsDisplay() {
    setIsDetailsOpen(false);
  }

  function presentItem() {
    console.log({ selectedItem });
    let matchedEvidence;
    if (Array.isArray(requiredEvidence)) {
      matchedEvidence = requiredEvidence.find(
        (item) => item.name === itemObj.name
      );
    } else {
      matchedEvidence = requiredEvidence;
    }
    if (selectedItem === matchedEvidence.name) {
      dispatch(switchConversation(nextResponseID));
    } else {
      dispatch(displayInvalidEvidenceDialogue());
    }
    closeDetailsDisplay();
    dispatch(toggleInventory());
  }

  const serializers = {
    types: {
      block: (props) => {
        return BlockContent.defaultSerializers.types.block(props);
      },
    },
  };

  const renderDescription = () => {
    if (!act) {
      return <p>{itemObj.description}</p>;
    } else {
      const description = itemObj[`description${act.toUpperCase()}`];
      if (!description) return <p>{itemObj.description}</p>;
      return <BlockContent blocks={description} serializers={serializers} />;
    }
  };

  return (
    <StyledItemDetailsDisplay>
      <img src={itemObj.imageUrl} alt="" />
      <div className="written_details">
        <h4>{itemObj.name}</h4>
        {renderDescription()}
        <button onClick={presentItem}>Present</button>
        <button onClick={closeDetailsDisplay}>Close</button>
      </div>
    </StyledItemDetailsDisplay>
  );
};

export default Inventory;

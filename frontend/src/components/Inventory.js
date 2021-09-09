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
import { getUserItemsFromLocalStorage } from '../lib/localStorage';
import AddToInventory from './AddToInventory';

const Inventory = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isShowingPeople, setIsShowingPeople] = useState(false);
  const [isShowingAddItem, setIsShowingAddItem] = useState(false);
  const dispatch = useDispatch();

  const isMapOpen = useSelector((state) => state.dialogue.isMapOpen);
  const fullItemsInventory = useSelector((store) => store.inventory.items);
  const { userItems } = useSelector((store) => store.inventory);
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

  function toggleShowingAddItem() {
    setIsShowingAddItem(!isShowingAddItem);
  }

  function closeShowingAddItems() {
    setIsShowingAddItem(false);
  }

  // * NOTE: We have the ability to filter based on what's in the user's inventory!
  // * It's this function
  function selectUserItemsFromFullInventory() {
    return fullItemsInventory.filter((item) => {
      return userItems.includes(item.name);
    });
  }

  function renderInventory() {
    const selectedItems = isShowingPeople
      ? animalNotes
      : selectUserItemsFromFullInventory();
    const jsx = selectedItems.map((item) => {
      return (
        <div
          key={item.name}
          data-name={item.name}
          onClick={displayItemDetails}
          className="inventory_item"
        >
          <img
            src={urlFor(item.imageUrl).width(200).height(200).url()}
            alt=""
            className="inventory_item_image"
          />
          <span>{item.name}</span>
        </div>
      );
    });

    return jsx;
  }
  return (
    <div className="inventory_container">
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
            <button onClick={toggleShowingAddItem}>Add to inventory</button>
          </div>
          {isMapOpen ? (
            <Map />
          ) : (
            <div className="inventory_grid_container">
              <div className="inventory_grid">{renderInventory()}</div>
              <div
                className={`addtoinventory_container ${
                  isShowingAddItem ? '' : 'hide'
                }`}
              >
                <AddToInventory closeDisplay={closeShowingAddItems} />
              </div>
            </div>
          )}
        </StyledInventory>
      )}
    </div>
  );
};

const StyledInventory = styled.div`
  position: absolute;
  top: calc(50vh - 290px);
  left: 50vw;
  transform: translateX(-50%);
  width: 679px;
  height: 350px;
  z-index: 6;
  /* border: 1px solid black; */
  /* padding: 1rem; */
  background: rgb(188, 221, 200)
    url('https://catwithmonocle.com/wp-content/uploads/2020/03/ac-new-horizons-nook-pattern-3840x2160-1.jpg');
  border-radius: 5px;

  @media all and (max-width: 800px) {
    width: 597px;
  }

  @media all and (max-width: 420px) {
    width: 95vw;
    top: 10vh;
    height: auto;
    bottom: calc(50vh - 86px);
  }

  @media all and (min-height: 900px) and (min-width: 1000px) and (max-width: 1026px) {
    top: calc(50vh - 478px);
  }

  .addtoinventory_container {
    position: absolute;
    width: 90%;
    height: 120px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
  }

  .inventory_header {
    width: 100%;
    /* border: 1px solid black; */
    text-align: center;
    background: none;
  }

  .inventory_grid_container {
    height: calc(100% - 2rem - 2px);
    width: 100%;
    overflow-y: scroll;
    padding: 1rem;
    background: none;
  }

  .inventory_grid {
    border: none;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    height: auto;
    width: 100%;
    background: none;
    /* div:last-child {
      margin-bottom: 1rem;
    } */
  }

  div {
    /* border: 1px solid black; */
    /* display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; */
    padding: 0.4rem 0;
    background-color: #fff;
  }

  .inventory_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
  }

  img.inventory_item_image {
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

  .hide {
    display: none;
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
    console.log({ selectedItem, requiredEvidence, itemObj });
    let matchedEvidence;
    if (Array.isArray(requiredEvidence)) {
      matchedEvidence = requiredEvidence.find(
        (item) => item.name === itemObj.name
      );
    } else {
      matchedEvidence = requiredEvidence;
    }
    console.log({ matchedEvidence });
    if (selectedItem === matchedEvidence?.name) {
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

const StyledItemDetailsDisplay = styled.div`
  position: absolute;
  top: calc(50vh - 290px);
  left: 50vw;
  transform: translateX(-50%);
  width: 679px;
  height: 350px;
  border: 1px solid black;
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  grid-template-columns: 200px 1fr;
  background-color: palegoldenrod;
  border-radius: 5px;

  @media all and (max-width: 800px) {
    width: 597px;
  }

  @media all and (max-width: 420px) {
    width: 95vw;
    top: 10vh;
    height: auto;
    bottom: calc(50vh - 86px);
  }

  @media all and (min-height: 900px) and (min-width: 1000px) and (max-width: 1026px) {
    top: calc(50vh - 478px);
  }

  .inventory_container {
  }

  img {
    width: 200px;
    height: 200px;
  }

  h4 {
    margin: 0;
    padding: 0;
  }
`;

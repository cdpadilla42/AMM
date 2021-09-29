import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';
import {
  closeMap,
  toggleInventory,
  switchConversation,
  displayInvalidEvidenceDialogue,
  openMap,
} from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import urlFor from '../lib/imageUrlBuilder';
import Map from './Map';
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

  const requiredEvidence = currentDialogueObj?.requiredEvidence;
  const nextResponseID =
    currentDialogueObj?.responseOptions?.[0]?.followingDialogue?._id;

  function displayItemDetails(e) {
    const itemName = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.name);
    setSelectedItem(itemName);
    setIsDetailsOpen(true);
  }

  function showPeopole() {
    setIsShowingPeople(true);
    dispatch(closeMap());
    setIsShowingAddItem(false);
  }

  function showItems() {
    setIsShowingPeople(false);
    dispatch(closeMap());
    setIsShowingAddItem(false);
  }

  function showMap() {
    dispatch(openMap());
    setIsShowingPeople(false);
    setIsShowingAddItem(false);
  }

  function toggleShowingAddItem() {
    setIsShowingAddItem(!isShowingAddItem);
    setIsShowingPeople(false);
    dispatch(closeMap());
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
    // Below is where you can swap in and out fullItemsInventory and the inventory based on the user inventory
    const selectedItems = isShowingPeople
      ? animalNotes
      : selectUserItemsFromFullInventory();

    return (
      <div className="inventory_grid_container">
        {(!selectedItems || selectedItems.length === 0) && !isShowingAddItem ? (
          <div className="inventory_noitems_message">
            You don't have any evidence! Try snooping around the New Leaf Island
            on the Switch
          </div>
        ) : (
          <div className="inventory_grid">
            {renderInventoryItems(selectedItems)}
          </div>
        )}
        <div
          className={`addtoinventory_container ${
            isShowingAddItem ? '' : 'hide'
          }`}
        >
          <AddToInventory
            closeDisplay={closeShowingAddItems}
            isOpen={isShowingAddItem}
          />
        </div>
      </div>
    );
  }

  function renderInventoryItems(selectedItems) {
    return selectedItems.map((item) => {
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
            <button onClick={showItems}>Items</button>
            <button onClick={showPeopole}>Animals</button>
            <button onClick={showMap}>Map</button>
            <button onClick={toggleShowingAddItem}>Add to inventory</button>
          </div>
          {isMapOpen ? <Map /> : renderInventory()}
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

  .inventory_noitems_message {
    padding: 0.5rem;
    background-color: #fff;
    border-radius: 5px;
    text-align: center;
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
  z-index: 6;
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

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';
import {
  closeMap,
  toggleInventory,
  switchConversation,
  displayInvalidEvidenceDialogue,
  openMap,
  displayComeBackLaterDialogue,
} from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import urlFor from '../lib/imageUrlBuilder';
import Map from './Map';
import AddToInventory from './AddToInventory';
import { markUserNotPromptedForEvidence } from '../store/inventory';
import { hideHealthBar, loseHealth } from '../store/health';

const Inventory = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isShowingPeople, setIsShowingPeople] = useState(false);
  const [isShowingAddItem, setIsShowingAddItem] = useState(false);
  const [errorClass, setErroClass] = useState('');
  const dispatch = useDispatch();

  const isMapOpen = useSelector((state) => state.dialogue.isMapOpen);
  const fullItemsInventory = useSelector((store) => store.inventory.items);
  const { inventoryScreen } = useSelector((store) => store.dialogue);
  const { userItems, userPromptedForEvidence, mapLocations } = useSelector(
    (store) => store.inventory
  );
  const isInventoryOpen = useSelector(
    (state) => state.dialogue.isInventoryOpen
  );
  const animalNotes = useSelector((store) => store.inventory.notes);
  const currentDialogueObj = useCurrentDialogueObj();
  const inventoryPrompt = currentDialogueObj.inventoryPrompt;

  const requiredEvidence = currentDialogueObj?.requiredEvidence;
  const nextResponseID =
    currentDialogueObj.followingDialogueFromEvidence?._id ||
    currentDialogueObj.responseOptions?.[0]?.followingDialogue._id;

  useEffect(() => {
    if (inventoryScreen === 'animalNotes') {
      showPeopole();
    } else if (inventoryScreen === 'item') {
      showItems();
    } else if (inventoryScreen === 'mapLocation') {
      showMap();
    } else {
      return;
    }
  }, [inventoryScreen]);

  useEffect(() => {
    return () => dispatch(hideHealthBar());
  }, []);

  function displayItemDetails(e) {
    const itemName = e.currentTarget.dataset.name;
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

  const showErrorAnimation = () => {
    setErroClass('ahashakeheartache');
    setTimeout(() => {
      setErroClass('');
    }, 2000);
  };

  // * NOTE: We have the ability to filter based on what's in the user's inventory!
  // * It's this function
  function selectUserItemsFromFullInventory() {
    return fullItemsInventory.filter((item) => {
      return userItems.includes(item.name);
    });
  }

  const handleComeBackLaterClick = () => {
    dispatch(displayComeBackLaterDialogue());
    dispatch(toggleInventory());

    dispatch(markUserNotPromptedForEvidence());
  };

  const closeInventory = () => {
    dispatch(toggleInventory());
  };

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
          className={`addtoinventory_container ${errorClass} ${
            isShowingAddItem ? '' : 'hide'
          }`}
        >
          <AddToInventory
            closeDisplay={closeShowingAddItems}
            isOpen={isShowingAddItem}
            close={closeShowingAddItems}
            showErrorAnimation={showErrorAnimation}
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
          <div className="image_wrapper">
            <img
              src={urlFor(item.imageUrl).width(200).height(200).url()}
              alt=""
              className="inventory_item_image"
            />
          </div>
          <span>{item.name}</span>
        </div>
      );
    });
  }

  let currentInventoryForItemDetailsDisplay;
  if (isShowingPeople) {
    currentInventoryForItemDetailsDisplay = animalNotes;
  } else if (isMapOpen) {
    currentInventoryForItemDetailsDisplay = mapLocations;
  } else {
    currentInventoryForItemDetailsDisplay = fullItemsInventory;
  }

  const renderMainDisplay = () => {
    if (isDetailsOpen) {
      return (
        <ItemDetailsDisplay
          selectedItem={selectedItem}
          inventory={currentInventoryForItemDetailsDisplay}
          setIsDetailsOpen={setIsDetailsOpen}
          requiredEvidence={requiredEvidence}
          nextResponseID={nextResponseID}
          isMapOpen={isMapOpen}
          loseHealthOnIncorrect={currentDialogueObj.loseHealthOnIncorrect}
          onHealthOut={handleComeBackLaterClick}
        />
      );
    } else if (isMapOpen) {
      return <Map onRegionClick={displayItemDetails} />;
    } else {
      return renderInventory();
    }
  };
  const promptMessage = useMemo(() => {
    return userPromptedForEvidence && inventoryPrompt;
  }, [userPromptedForEvidence, inventoryPrompt]);

  return (
    <div
      className={`inventory_container${isInventoryOpen ? '' : ' off_screen'}`}
    >
      <StyledInventory>
        <div className="inventory_header">
          <button onClick={showItems} disabled={userPromptedForEvidence}>
            Items
          </button>
          <button onClick={showPeopole} disabled={userPromptedForEvidence}>
            Animals
          </button>
          <button onClick={showMap} disabled={userPromptedForEvidence}>
            Map
          </button>
          <button onClick={toggleShowingAddItem}>Add to inventory</button>
          {userPromptedForEvidence ? (
            <button
              onClick={handleComeBackLaterClick}
              className="come_back_button"
            >
              Come Back Later
            </button>
          ) : (
            <button onClick={closeInventory} className="close_button">
              &times;
            </button>
          )}
        </div>
        <div className="inventory_prompt">{promptMessage}</div>
        {renderMainDisplay()}
      </StyledInventory>
    </div>
  );
};

const errorAnimation = keyframes`

  0% {
      transform: translate(calc(-50% + 30px), -50%);
    }
    20% {
      transform: translate(calc(-50% - 30px ), -50%);
    }
    40% {
      transform: translate(calc(-50% + 15px), -50%);
    }
    60% {
      transform: translate(calc(-50% -15px ), -50%);
    }
    80% {
      transform: translate(calc(-50% + 8px), -50%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
`;

const StyledInventory = styled.div`
  width: 100%;
  height: 100%;
  z-index: 6;
  /* border: 1px solid black; */
  /* padding: 1rem; */
  background: rgb(188, 221, 200)
    url('https://catwithmonocle.com/wp-content/uploads/2020/03/ac-new-horizons-nook-pattern-3840x2160-1.jpg');
  border-radius: 5px;
  pointer-events: auto;

  @media all and (max-width: 800px) {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    padding-top: 3rem;
  }

  .addtoinventory_container {
    position: absolute;
    width: 600px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;

    @media all and (max-width: 800px) {
      width: 90vw;
    }
  }

  .inventory_header {
    width: 100%;
    /* border: 1px solid black; */
    text-align: center;
    background: none;
    padding-top: 2rem;
  }

  .inventory_header button {
    height: 2rem;
  }

  .inventory_prompt {
    text-align: center;
    font-weight: 700;
    width: 90%;
    border-radius: 15px;
    margin: 0 auto;
    min-height: 35px;
  }

  .inventory_grid_container {
    height: calc(100% - 80px - 35px);
    width: 100%;
    overflow-y: scroll;
    padding: 1rem;
    background: none;
    @media all and (max-width: 800px) {
      height: calc(100% - 65px - 3px);
    }
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
    padding: 0;
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
    background-color: var(--cream);
    color: var(--brown-black);
  }

  .inventory_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--brown-black);
    background-color: #fff;
    cursor: pointer;
    &:hover {
      color: #34b3a5;
    }
  }

  .image_wrapper {
    background-color: var(--cream);
    width: 80%;
    text-align: center;
  }

  .inventory_noitems_message {
    padding: 0.5rem;
    background-color: var(--cream);
    color: var(--brown-black);
    border-radius: 5px;
    text-align: center;
  }

  img.inventory_item_image {
    width: 80px;
    height: 80px;
    @media all and (max-width: 420px) {
      width: 40px;
      height: 40px;
    }
  }

  span {
    display: block;
    flex: 1;
  }

  button {
    display: inline;
    color: var(--brown-black);
    background-color: var(--cream);
    border: none;
    border-radius: 45px;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.1rem 1rem;
    transform: translateY(0);
    transition: transform 0.2s ease;
    margin: 0 0.5rem;
    &:hover {
      color: #34b3a5;
      cursor: pointer;
      transform: translateY(-2px);
    }
  }

  .come_back_button {
    background-color: var(--brown-black);
    color: var(--cream);
  }

  .close_button {
    background-color: var(--brown-black);
    color: var(--cream);
    padding: 0 40px;
  }

  .hide {
    display: none;
  }

  .addtoinventory_container {
    box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  }

  .addtoinventory_container.ahashakeheartache {
    animation-name: ${errorAnimation};
    animation-duration: 0.4s;
    animation-iteration-count: 1;
  }
  /* @-webkit-keyframes kf_shake {
    0% {
      -webkit-transform: translate(30px);
    }
    20% {
      -webkit-transform: translate(-30px);
    }
    40% {
      -webkit-transform: translate(15px);
    }
    60% {
      -webkit-transform: translate(-15px);
    }
    80% {
      -webkit-transform: translate(8px);
    }
    100% {
      -webkit-transform: translate(0px);
    }
  }
  @-moz-keyframes kf_shake {
    0% {
      -moz-transform: translate(30px);
    }
    20% {
      -moz-transform: translate(-30px);
    }
    40% {
      -moz-transform: translate(15px);
    }
    60% {
      -moz-transform: translate(-15px);
    }
    80% {
      -moz-transform: translate(8px);
    }
    100% {
      -moz-transform: translate(0px);
    }
  }
  @-o-keyframes kf_shake {
    0% {
      -o-transform: translate(30px);
    }
    20% {
      -o-transform: translate(-30px);
    }
    40% {
      -o-transform: translate(15px);
    }
    60% {
      -o-transform: translate(-15px);
    }
    80% {
      -o-transform: translate(8px);
    }
    100% {
      -o-origin-transform: translate(0px);
    }
  } */
`;

export const ItemDetailsDisplay = ({
  selectedItem,
  inventory,
  setIsDetailsOpen,
  requiredEvidence,
  nextResponseID,
  isMapOpen,
  loseHealthOnIncorrect,
  onHealthOut,
}) => {
  const { current: health } = useSelector((store) => store.health);
  const { userPromptedForEvidence } = useSelector((store) => store.inventory);
  const itemObj = inventory.find((item) => item.name === selectedItem);
  const dispatch = useDispatch();
  const act = useSelector((store) => store.conversations.conversation?.[0].act);

  function closeDetailsDisplay() {
    setIsDetailsOpen(false);
  }

  function presentItem() {
    let matchedEvidence;
    if (Array.isArray(requiredEvidence)) {
      matchedEvidence = requiredEvidence.find(
        (item) => item.name === itemObj.name
      );
    } else {
      matchedEvidence = requiredEvidence;
    }
    if (selectedItem === matchedEvidence?.name) {
      dispatch(switchConversation(nextResponseID));
      dispatch(markUserNotPromptedForEvidence());
      dispatch(hideHealthBar());
    } else {
      dispatch(displayInvalidEvidenceDialogue());
      if (loseHealthOnIncorrect) {
        if (health === 1) {
          onHealthOut();
          dispatch(hideHealthBar());
          dispatch(toggleInventory());
        }
        dispatch(loseHealth());
      }
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
    let renderingAct = act;
    if (act === 'b') {
      renderingAct = 'a';
    }
    if (!act) {
      return <p>{itemObj.description}</p>;
    } else {
      const description = itemObj[`description${renderingAct.toUpperCase()}`];
      if (!description) return <p>{itemObj.description}</p>;
      return <BlockContent blocks={description} serializers={serializers} />;
    }
  };

  return (
    <StyledItemDetailsDisplay>
      <div className="left_grid_container">
        <div className="polaroid">
          <div className="image">
            <img src={itemObj.imageUrl} alt="" />
          </div>
          <div className="caption">{itemObj.name}</div>
        </div>
      </div>
      <div className="written_details">
        {/* <h4>{itemObj.name}</h4> */}
        {renderDescription()}
        {/* TODO: Hide if not promptedforevidence */}
        {userPromptedForEvidence && (
          <button onClick={presentItem} className="present">
            Present
          </button>
        )}

        <button onClick={closeDetailsDisplay} className="close">
          &times;
        </button>
      </div>
    </StyledItemDetailsDisplay>
  );
};

export default Inventory;

const StyledItemDetailsDisplay = styled.div`
  position: absolute;
  z-index: 6;
  top: calc(50vh - 290px);
  left: 50%;
  transform: translateX(-50%);
  width: 679px;
  max-height: 350px;
  display: grid;
  grid-gap: 1rem;
  padding: 1rem !important;
  grid-template-columns: 250px 1fr;
  background-color: var(--cream);
  color: var(--brown-black);
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 700;

  /* @media all and (max-width: 800px) {
    width: 597px;
  } */

  @media all and (max-width: 420px) {
    width: 95vw;
    /* height: calc(var(--vh, 1vh) * 80); */
    top: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    /* bottom: calc(50vh - 86px); */
    grid-template-columns: 125px 1fr;
  }

  /* @media all and (min-height: 900px) and (min-width: 1000px) and (max-width: 1026px) {
    top: calc(50vh - 478px);
  } */

  .polaroid {
    background: #fff;
    padding: 1rem;
    box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
    height: auto;
  }
  .polaroid > .image {
    max-width: 100%;
    height: auto;
    background-color: var(--cream);
    text-align: center;
  }
  .caption {
    font-size: 1.8rem;
    text-align: center;
    line-height: 2rem;
  }

  img {
    width: 200px;
    height: 200px;
    @media all and (max-width: 420px) {
      width: 100px;
      height: 100px;
    }
  }

  .written_details {
    font-size: 1.2rem;
    position: relative;
    padding-bottom: 2rem;
    max-height: 318px;
    p:first-child,
    div:first-child {
      overflow: scroll;
      max-height: 239px;
    }
  }

  h4 {
    margin: 0;
    padding: 0;
  }

  button {
    background-color: #34b3a5;
    color: var(--cream);
    border: none;
    border-radius: 45px;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    transform: translateY(0);
    transition: transform 1s ease;
    &:hover {
      color: #fdb71a;
      cursor: pointer;
      transform: translateY(-5px);
    }
  }

  button.close {
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
    padding: 0.5rem 1rem;
  }

  button.present {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleInventory } from '../store/dialogue';
import backpack from '../imgs/Bag_NH_Inv_Icon.png';
import { useLocation, useParams } from 'react-router';

const InventoryButton = () => {
  const dispatch = useDispatch();
  const handleOpenInventoryButtonClick = () => {
    dispatch(toggleInventory());
  };

  // If the intro dialogue, don't show
  const params = useParams();
  if (params.id === '729d0b36-6021-4843-8e09-da92c651022f') {
    return null;
  }

  return (
    <StyledInventoryButton>
      {/* <button
        type="button"
        className="open_inventory_button"
        onClick={handleOpenInventoryButtonClick}
      >
        🎒
      </button> */}
      <img
        type="button"
        className="open_inventory_button"
        onClick={handleOpenInventoryButtonClick}
        src={backpack}
      />
    </StyledInventoryButton>
  );
};

export default InventoryButton;

const StyledInventoryButton = styled.div`
  position: absolute;
  transition: background-color 0.8s ease;
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 755px;
  height: 765px;
  pointer-events: none;
  @media all and (max-width: 420px) {
    top: 0;
    left: 0;
    transform: none;
    width: 100vw;
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
    font-size: 1.5rem;
  }

  .open_inventory_button {
    /* background-color: var(--blue); */
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: none;
    font-size: 3rem;
    position: absolute;
    top: 20px;
    left: 20px;
    pointer-events: auto;
    cursor: pointer;
  }
`;

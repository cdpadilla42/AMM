import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleInventory, switchConversation } from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import urlFor from '../lib/imageUrlBuilder';

const StyledMap = styled.div`
  /* position: absolute; */
  width: 100%;
  height: 466px; // originally 350px
  /* z-index: 6; */
  border: 1px solid black;
  background-image: url('https://i.etsystatic.com/10064703/r/il/ad984c/1688605000/il_1588xN.1688605000_7491.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2fr 1fr;

  /* Use below for seeing click boxes */
  /* & > * {
    border: 1px solid green;
  } */

  & > .click_box {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }

  .ocean {
    grid-column-start: span 2;
  }

  /* .inventory_header {
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
  } */
`;

const Map = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const currentDialogueObj = useCurrentDialogueObj();

  const requiredEvidence = currentDialogueObj.requiredEvidence?.name;
  // const nextResponseID =
  //   currentDialogueObj.responseOptions[0].followingDialogue._id;

  function handleClick(e) {
    console.log(e.target);
  }
  return (
    <>
      <StyledMap onClick={handleClick}>
        <div className="click_box night"></div>
        <div className="click_box day"></div>
        <div className="click_box ocean"></div>
      </StyledMap>
    </>
  );
};

export default Map;

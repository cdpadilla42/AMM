import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleInventory, switchConversation } from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import urlFor from '../lib/imageUrlBuilder';

const StyledMap = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  height: 350px;
  z-index: 6;
  border: 1px solid black;
  padding: 1rem;
  background-color: palegoldenrod;
  border-radius: 5px;

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

  return (
    <>
      <StyledMap></StyledMap>
    </>
  );
};

export default Map;

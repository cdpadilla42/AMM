import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import {
  storeDialoguePositionForLater,
  switchConversation,
} from '../store/dialogue';

const ObjectionButton = () => {
  const dispatch = useDispatch();
  const currentDialogueObj = useCurrentDialogueObj();
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);

  const phrases = currentDialogueObj?.phrase;
  const currentPhrase = phrases?.[currentDialoguePosition] || {};
  const objectionDialogueID = currentPhrase.objectionDialogue?._id;

  const handleClick = () => {
    // Objection animation some day...
    // store currentDialoguePosition into redux
    dispatch(storeDialoguePositionForLater(currentDialoguePosition));
    // Switch dialogue
    dispatch(switchConversation(objectionDialogueID));
  };

  return (
    <StyledObjectionButton $show={objectionDialogueID} onClick={handleClick}>
      OBJECTION!!!
    </StyledObjectionButton>
  );
};

const StyledObjectionButton = styled.button`
  margin: 0 auto;
  background-color: #34b3a5;
  color: var(--cream);
  ${(props) => (props.$show ? 'display: block;' : 'display: none;')};

  width: 600px;
  position: absolute;
  top: calc(var(--vh, 1vh) * 50 - 300px);
  font-size: 1.1rem;
  font-weight: 700;
  z-index: 150;
  border: 2px solid var(--cream);
  border-radius: 50px;
  padding: 1rem;
  text-align: center;
  &:hover {
    background-color: var(--cream);
    color: #34b3a5;
    cursor: pointer;
  }

  @media all and (max-width: 800px) {
    width: 80%;
    top: calc(var(--vh, 1vh) * 50 - 200px);
  }
  @media all and (max-width: 420px) {
    height: auto;
  }
`;

export default ObjectionButton;

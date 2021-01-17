import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchConversation } from '../store/dialogue';

const StyledResponseBox = styled.div`
  width: 200px;
  background-color: #fff;
  border: 1px solid green;
  position: absolute;
  right: 1rem;
  bottom: 170px;
  z-index: 2;
  border-radius: 20px;
  padding: 1rem;

  &.hide {
    display: none;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.3rem 0;
  }
`;

const ResponseBox = () => {
  const { responseBoxIsOpen, currentDialogueID, dialogue } = useSelector(
    (state) => state.dialogue
  );
  const dispatch = useDispatch();

  function renderResponseOptions() {
    let currentDialogue;
    if (!currentDialogueID) {
      currentDialogue = dialogue.find((phrases) =>
        phrases.name.includes('Start')
      );
    } else {
      currentDialogue = dialogue.find(
        (phrases) => phrases._id === currentDialogueID
      );
    }
    const responseOptions = currentDialogue?.responseOptions;
    if (!responseOptions) return;
    console.log(responseOptions);

    return responseOptions.map((optionObj) => (
      <li onClick={() => handleClick(optionObj.followingDialogue._id)}>
        {optionObj.text}
      </li>
    ));
  }

  function handleClick(followingDialogueID) {
    console.log(followingDialogueID);
    dispatch(switchConversation(followingDialogueID));
  }

  return (
    <StyledResponseBox className={responseBoxIsOpen ? '' : 'hide'}>
      <ul>{renderResponseOptions()}</ul>
    </StyledResponseBox>
  );
};

export default ResponseBox;

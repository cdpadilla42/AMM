import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchConversation } from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import { useHistory } from 'react-router-dom';

const StyledResponseBox = styled.div`
  width: 200px;
  background-color: #fff;
  border: 1px solid green;
  position: absolute;
  /* right: 25%; */

  z-index: 2;
  border-radius: 20px;
  padding: 1rem;
  @media all and (max-width: 600px) {
    top: 20px;
    height: auto;
    width: calc(100% - 4rem);
  }
  @media all and (min-width: 601px) {
    bottom: 170px;
  }

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
  const currentDialogueObj = useCurrentDialogueObj();
  const history = useHistory();

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
      <li onClick={() => handleClick(optionObj.followingDialogue?._id)}>
        {optionObj.text}
      </li>
    ));
  }

  function handleClick(followingDialogueID) {
    if (currentDialogueObj?.isFinalDialogue) {
      history.push('/');
    } else {
      dispatch(switchConversation(followingDialogueID));
    }
  }

  return (
    <StyledResponseBox className={responseBoxIsOpen ? '' : 'hide'}>
      <ul>{renderResponseOptions()}</ul>
    </StyledResponseBox>
  );
};

export default ResponseBox;

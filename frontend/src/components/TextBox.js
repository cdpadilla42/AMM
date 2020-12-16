import React, { useRef, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import {
  nextDialogue,
  prevDialogue,
  toggleResponseBox,
  toggleInventory,
  switchConversation,
} from '../store/dialogue';
import draw from '../lib/async-typer';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';

const TextBox = (props) => {
  const textRef = useRef(null);
  const history = useHistory();
  const {
    dialogue,
    currentDialoguePosition,
    currentDialogueName,
    currentDialogueID,
    prevDialogueID,
  } = useSelector((state) => state.dialogue);

  let currentDialogueObj = useCurrentDialogueObj();

  const phrases = currentDialogueObj && currentDialogueObj.phrase;
  // const responseOptions = currentDialogueObj
  //   ? currentDialogueObj.responseOptions
  //   : null;

  // On change effect
  useEffect(() => {
    const textEl = textRef.current;
    const speaker = phrases[currentDialoguePosition].speaker.name;
    const text = phrases[currentDialoguePosition].text;
    draw(textEl, `${speaker}: ${text}`);
  }, [
    dialogue,
    currentDialoguePosition,
    currentDialogueName,
    currentDialogueID,
  ]);

  const handleNextClick = () => {
    const isEndOfDialogue =
      currentDialoguePosition === currentDialogueObj.phrase.length - 1;

    if (isEndOfDialogue && currentDialogueObj.name === 'Incorrect') {
      props.switchConversation(prevDialogueID);
    } else if (isEndOfDialogue && currentDialogueObj.needEvidence) {
      props.toggleInventory();
    } else if (isEndOfDialogue && currentDialogueObj.isFinalDialogue) {
      history.push('/');
    } else if (isEndOfDialogue) {
      props.toggleResponseBox();
    } else {
      props.nextDialogue();
    }
  };

  const handlePrevClick = () => {
    if (currentDialoguePosition === 0) {
      console.log('stopping');
    } else {
      props.prevDialogue();
    }
  };

  return (
    <div className="text_box">
      <div className="text_box__name">Gato</div>
      <div className="text_box__main">
        <p className="text_box__text" ref={textRef}></p>
        <button className="text_box__left_arrow" onClick={handlePrevClick}>
          Back
        </button>
        <button className="text_box__right_arrow" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      nextDialogue,
      prevDialogue,
      toggleResponseBox,
      toggleInventory,
      switchConversation,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(TextBox);

import React, { useRef, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  nextDialogue,
  prevDialogue,
  toggleResponseBox,
  toggleInventory,
} from '../store/dialogue';
import draw from '../lib/async-typer';

const TextBox = (props) => {
  const textRef = useRef(null);
  const {
    dialogue,
    currentDialoguePosition,
    currentDialogueName,
    currentDialogueID,
  } = useSelector((state) => state.dialogue);
  console.log(dialogue, currentDialoguePosition);

  let currentDialogueObj;

  if (!currentDialogueID) {
    currentDialogueObj = dialogue.find((dialogue) => dialogue.name === 'Start');
  } else {
    currentDialogueObj = dialogue.find(
      (dialogue) => dialogue._id === currentDialogueID
    );
  }
  const phrases = currentDialogueObj && currentDialogueObj.phrase;
  const responseOptions = currentDialogueObj
    ? currentDialogueObj.responseOptions
    : null;

  // On change effect
  useEffect(() => {
    const textEl = textRef.current;
    const speaker = phrases[currentDialoguePosition].speaker.name;
    const text = phrases[currentDialoguePosition].text;
    console.log();
    draw(textEl, `${speaker}: ${text}`);
  }, [
    dialogue,
    currentDialoguePosition,
    currentDialogueName,
    currentDialogueID,
  ]);

  const handleNextClick = () => {
    // if (props.currentDialoguePosition === props.dialogue.length - 1) {
    //   console.log('stopping');
    // } else {

    //
    // }
    const isEndOfDialogue =
      currentDialoguePosition === currentDialogueObj.phrase.length - 1;

    if (isEndOfDialogue && currentDialogueObj.needEvidence) {
      props.toggleInventory();
    } else if (isEndOfDialogue) {
      props.toggleResponseBox();
    } else {
      props.nextDialogue();
    }
  };

  const handlePrevClick = () => {
    if (props.currentDialoguePosition === 0) {
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

// function mapStateToProps(state) {
//   const { dialogue, currentDialoguePosition } = state;
//   return { dialogue, currentDialoguePosition };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { nextDialogue, prevDialogue, toggleResponseBox, toggleInventory },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(TextBox);

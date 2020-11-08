import React, { useRef, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextDialogue, prevDialogue } from '../store/dialogue';
import draw from '../lib/async-typer';

const TextBox = (props) => {
  const textRef = useRef(null);
  const {
    dialogue,
    currentDialoguePosition,
    currentDialogueName,
  } = useSelector((state) => state.dialogue);
  console.log(dialogue, currentDialoguePosition);

  const currentDialogueObj = dialogue.find(
    (dialogue) => dialogue.name === currentDialogueName
  );
  const phrases = currentDialogueObj && currentDialogueObj.phrase;

  // On change effect
  useEffect(() => {
    const textEl = textRef.current;
    const speaker = phrases[currentDialoguePosition].speaker.name;
    const text = phrases[currentDialoguePosition].text;
    console.log();
    draw(textEl, `${speaker}: ${text}`);
  });

  const handleNextClick = () => {
    // if (props.currentDialoguePosition === props.dialogue.length - 1) {
    //   console.log('stopping');
    // } else {

    //
    // }

    if (currentDialoguePosition === currentDialogueObj.phrase.length - 1) {
      console.log('here comes the question');
      console.log(currentDialogueObj.responseOptions);
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
  return bindActionCreators({ nextDialogue, prevDialogue }, dispatch);
}

export default connect(null, mapDispatchToProps)(TextBox);

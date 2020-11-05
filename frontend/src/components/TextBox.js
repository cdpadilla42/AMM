import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextDialogue, prevDialogue } from '../store/dialogue/reducer';
import draw from '../lib/async-typer';

const TextBox = (props) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textEl = textRef.current;
    draw(textEl, props.dialogue[props.currentDialoguePosition]);
  });

  const handleNextClick = () => {
    if (props.currentDialoguePosition === props.dialogue.length - 1) {
      console.log('stopping');
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

function mapStateToProps(state) {
  const { dialogue, currentDialoguePosition } = state;
  return { dialogue, currentDialoguePosition };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ nextDialogue, prevDialogue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);

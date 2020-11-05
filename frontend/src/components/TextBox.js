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

  return (
    <div className="text_box">
      <div className="text_box__name">Gato</div>
      <div className="text_box__main">
        <p className="text_box__text" ref={textRef}></p>
        <button className="text_box__left_arrow" onClick={props.prevDialogue}>
          Back
        </button>
        <button className="text_box__right_arrow" onClick={props.nextDialogue}>
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

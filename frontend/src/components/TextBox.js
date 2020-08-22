import styled from 'styled-components';
import draw from '../lib/async-typer';

import React, { Component } from 'react';

class TextBox extends Component {
  state = {
    currentDialoguePosition: 0,
    dialogue: [
      'This is the first sentence!',
      'This is the second! WOW!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!! !!!!!!',
      'This is the third sentence!',
    ],
  };

  textRef = React.createRef();

  componentDidMount() {
    const textEl = this.textRef.current;
    draw(textEl, this.state.dialogue[0]);
  }

  nextDialogue = () => {
    const textEl = this.textRef.current;
    const nextPosition = this.state.currentDialoguePosition + 1;
    if (nextPosition > this.state.dialogue.length - 1) return;
    this.setState({
      currentDialoguePosition: nextPosition,
    });
    draw(textEl, this.state.dialogue[nextPosition]);
  };

  drawText = () => {
    const textEl = this.textRef.current;
    draw(textEl);
  };

  render() {
    return (
      <div class="text_box">
        <div class="text_box__name">Gato</div>
        <div class="text_box__main">
          <p
            class="text_box__text"
            ref={this.textRef}
            data-text={this.state.dialogue[this.state.currentDialoguePosition]}
          ></p>
          <button class="text_box__left_arrow">Back</button>
          <button class="text_box__right_arrow" onClick={this.nextDialogue}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default TextBox;

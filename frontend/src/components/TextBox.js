import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import draw from '../lib/async-typer';
import emote from '../lib/emote';

class TextBox extends Component {
  state = {
    currentDialoguePosition: 0,
    dialogue: [
      ['This is the first sentence!', 'angry'],
      [
        'This is the second! WOW!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!! !!!!!!',
        'sad',
      ],
      ['This is the third sentence!', 'laughing'],
      ['This is the Fourth sentence!', 'sleepy'],
    ],
  };

  textRef = React.createRef();

  componentDidMount() {
    const textEl = this.textRef.current;
    draw(textEl, this.state.dialogue[0]);
    emote(this.state.dialogue[0][1]);
  }
  componentDidUpdate() {
    const textEl = this.textRef.current;
    draw(textEl, this.state.dialogue[this.state.currentDialoguePosition]);
    emote(this.state.dialogue[this.state.currentDialoguePosition][1]);
  }

  nextDialogue = () => {
    const nextPosition = this.state.currentDialoguePosition + 1;
    if (nextPosition > this.state.dialogue.length - 1) return;
    this.setState({
      currentDialoguePosition: nextPosition,
    });
  };

  prevDialogue = () => {
    const nextPosition = this.state.currentDialoguePosition - 1;
    if (nextPosition < 0) return;
    this.setState({
      currentDialoguePosition: nextPosition,
    });
  };

  render() {
    return (
      <div className="text_box">
        <div className="text_box__name">Gato</div>
        <div className="text_box__main">
          <p className="text_box__text" ref={this.textRef}></p>
          <button className="text_box__left_arrow" onClick={this.prevDialogue}>
            Back
          </button>
          <button className="text_box__right_arrow" onClick={this.nextDialogue}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default TextBox;

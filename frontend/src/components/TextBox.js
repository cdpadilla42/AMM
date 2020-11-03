import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextDialogue } from '../store/dialogue/reducer';
import styled from 'styled-components';
import draw from '../lib/async-typer';
import emote from '../lib/emote';

class TextBox extends Component {
  // state = {
  //   currentDialoguePosition: 0,
  //   dialogue: [
  //     ['This is the first sentence!', 'angry'],
  //     [
  //       'This is the second! WOW!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!! !!!!!!',
  //       'sad',
  //     ],
  //     ['This is the third sentence!', 'laughing'],
  //     ['This is the Fourth sentence!', 'sleepy'],
  //   ],
  // };

  // emotion = useSelector(
  //   (state) => state.dialogue[state.currentDialoguePosition][1]
  // );

  textRef = React.createRef();

  componentDidMount() {
    const textEl = this.textRef.current;
    draw(textEl, this.props.dialogue[0]);
    // emote(this.props.dialogue[0][1]);
  }
  componentDidUpdate() {
    const textEl = this.textRef.current;
    draw(textEl, this.props.dialogue[this.props.currentDialoguePosition]);
    // emote(this.state.dialogue[this.state.currentDialoguePosition][1]);
  }

  nextDialogue = () => {
    // const nextPosition = this.state.currentDialoguePosition + 1;
    // if (nextPosition > this.state.dialogue.length - 1) return;
    // this.setState({
    //   currentDialoguePosition: nextPosition,
    // });
    this.props.nextDialogue();
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

function mapStateToProps(state) {
  const { dialogue, currentDialoguePosition } = state;
  return { dialogue, currentDialoguePosition };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ nextDialogue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);

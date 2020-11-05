import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextDialogue, prevDialogue } from '../store/dialogue/reducer';
import draw from '../lib/async-typer';

class TextBox extends Component {
  textRef = React.createRef();

  componentDidMount() {
    const textEl = this.textRef.current;
    draw(textEl, this.props.dialogue);
  }
  componentDidUpdate() {
    const textEl = this.textRef.current;
    draw(textEl, this.props.dialogue[this.props.currentDialoguePosition]);
  }

  render() {
    return (
      <div className="text_box">
        <div className="text_box__name">Gato</div>
        <div className="text_box__main">
          <p className="text_box__text" ref={this.textRef}></p>
          <button
            className="text_box__left_arrow"
            onClick={this.props.prevDialogue}
          >
            Back
          </button>
          <button
            className="text_box__right_arrow"
            onClick={this.props.nextDialogue}
          >
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
  return bindActionCreators({ nextDialogue, prevDialogue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);

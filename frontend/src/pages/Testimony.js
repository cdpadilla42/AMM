import styled from 'styled-components';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import '../styles/testimony.css';

import React, { Component } from 'react';

class Testimony extends Component {
  render() {
    return (
      <div className="container">
        <Nav />
        <div class="game_container">
          <div class="game_container__animal">
            <img
              src="https://purepng.com/public/uploads/medium/big-chungus-z7y.png"
              alt=""
              class="game_container__animal_image"
            />
          </div>
          <TextBox />
        </div>
      </div>
    );
  }
}

export default Testimony;

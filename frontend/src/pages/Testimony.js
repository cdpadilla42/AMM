import styled from 'styled-components';
import TextBox from '../components/TextBox';
import Nav from '../components/Nav';
import '../styles/testimony.css';

import React, { Component } from 'react';
import AnimalDisplay from '../components/AnimalDisplay';

class Testimony extends Component {
  render() {
    return (
      <div className="container">
        <Nav />
        <div class="game_container">
          <AnimalDisplay />
          <TextBox />
        </div>
      </div>
    );
  }
}

export default Testimony;

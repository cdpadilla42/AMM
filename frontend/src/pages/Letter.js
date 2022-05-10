import React from 'react';
import styled from 'styled-components';

const Letter = () => {
  return (
    <StyledLetter>
      <section className="letter_container">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore dolor
        assumenda maxime praesentium sint neque voluptatum quas ab quo accusamus
        quia, quis, rerum repudiandae dolores hic numquam placeat itaque nihil.
        <figure>- Ñen</figure>
      </section>
    </StyledLetter>
  );
};

export default Letter;

const StyledLetter = styled.div`
  background-color: #f5f4d7;
  color: #231e1e;
  height: 100vh;

  .letter_container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 3rem;
    padding-bottom: 3rem;
    max-width: 960px;
    font-style: italic;
    font-family: Optima sans-serif;
    font-size: 2rem;
    text-align: left;
  }
`;

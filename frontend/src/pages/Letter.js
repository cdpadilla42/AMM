import React from 'react';
import styled from 'styled-components';

const Letter = () => {
  return (
    <StyledLetter>
      <section className="letter_container">
        <h2>**LOOKING FOR A DETECTIVE**</h2>

        <p>
          A murder attempt happened last night with the local pupper, Lucky, as
          the victim! I was the one who discovered the crime scene so the
          villagers are blaming me! I need someone to clear my name and find the
          true culprit!
        </p>

        <p>
          I’m looking for a detective who can find the truth by talking to a
          whole cast of unique characters, all with their own point of view.
          This detective would also need to be able to search my in-game island
          for evidence to use in an Ace-Attorney-like court system to make their
          case. If this sounds interesting to you, please come. :,c
        </p>

        <p>
          To get here, you’ll need a Nintendo Switch, a copy of Animal Crossing:
          New Horizons, and a Nintendo Online Subscription. If you lay on a bed
          in your in-game home, you’ll be able to travel to my dream island
          through my address. I’ll be waiting near my house in the center of the
          island with more information.
        </p>

        <p>
          If you have the time and skills please reach me via my dream code: DA
          5197-5510-7359
        </p>

        <p>Please help :C,</p>
        <figure>- Ñenn</figure>
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

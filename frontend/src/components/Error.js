import React from 'react';
import styled from 'styled-components';
import Shocked from '../imgs/shocked.png';

const Error = () => {
  return (
    <StyledError>
      <img src={Shocked} />
      <h1>Woops!</h1>
      <p>
        Something went wrong.
        <br />
        Try refreshing and give it another whirl!
      </p>
    </StyledError>
  );
};

export default Error;

const StyledError = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: var(--cream);
  color: var(--green);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  h1 {
    font-size: 3rem;
    margin-top: 0;
  }
  p {
    font-size: 1rem;
  }
`;

import React from 'react';
import styled from 'styled-components';
import Shocked from '../imgs/shocked.png';

const Error = ({ error }) => {
  const showStack =
    !process?.env.NODE_ENV || process?.env.NODE_ENV === 'production';
  return (
    <StyledError showStack={showStack}>
      <img src={Shocked} />
      <h1>Woops!</h1>
      <p>
        Something went wrong.
        <br />
        Try refreshing and give it another whirl!
        {error && (
          <>
            <p className="error_stack">{error?.message}</p>
            <p className="error_stack">{error?.stack}</p>
          </>
        )}
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

  .error_stack {
    /* display: ${(props) => (props.showStack ? 'block' : 'none')}; */
    display: block;
    text-align: left;
    max-width: 800px;
  }
`;

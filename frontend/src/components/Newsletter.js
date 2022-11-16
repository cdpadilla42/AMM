import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { signUpForNewsletter } from '../lib/util';

const Newsletter = () => {
  const [emailValue, setEmailValue] = useState('');

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValue && isValidEmail(emailValue)) {
      signUpForNewsletter(emailValue);
      setEmailValue('');
    } else {
      window.alert('Please provide a valid email');
    }
  };
  return (
    <StyledNewsletter onSubmit={handleSubmit}>
      {/* <label htmlFor="email">First name</label>
      <input type="text" name="name" id="name" /> */}
      <label htmlFor="email">Enter your email address:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.currentTarget.value)}
      />
      <button type="submit">Sign Up</button>
    </StyledNewsletter>
  );
};

export default Newsletter;

const StyledNewsletter = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  font-family: inherit;
  font-size: inherit;
  padding: 1rem;
  text-align: center;
  align-items: center;

  label {
    margin: 1rem 0;
  }

  #email {
    width: 80%;
    padding: 0.5rem;
    /* border: 1px solid #75ddc6;
    outline: 3px solid #75ddc6; */
    font-family: inherit;
    font-size: inherit;
  }

  button {
    border-radius: 15px;
    height: 60px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 2rem;
    font-weight: bold;
    font-size: 1.3em;
    margin-top: 1rem;
    background-color: var(--cream);
    color: var(--brown-black);
    border: 3px solid var(--brown-black);
    transition: transform 0.2s ease;
    text-transform: uppercase;
  }

  button:hover {
    color: #34b3a5;
    background-color: var(--cream);
    border: 3px solid #34b3a5;
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

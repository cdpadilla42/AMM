import React from 'react';
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
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="email">First name</label>
      <input type="text" name="name" id="name" /> */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.currentTarget.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Newsletter;

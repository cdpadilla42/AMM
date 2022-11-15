import React from 'react';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="email">First name</label>
      <input type="text" name="name" id="name" /> */}
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Newsletter;

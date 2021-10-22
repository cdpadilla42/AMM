import React from 'react';
import { useHistory } from 'react-router-dom';
const Nav = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/playground');
  };

  return (
    <nav>
      <a href="#" onClick={handleClick}>
        Animal Crossing
      </a>
      <a href="#">Jenn's Site</a>
      <a href="#">Chris's Site</a>
      <a href="#">Your Site</a>
    </nav>
  );
};

export default Nav;

import React from 'react';
import { useHistory } from 'react-router-dom';

const Credits = () => {
  const history = useHistory();
  // link to the epilogue
  // id: 56cc2315-f580-4116-bf9d-be350ea15e10
  const handleClick = () => {
    history.push('/testimony/56cc2315-f580-4116-bf9d-be350ea15e10');
  };

  return (
    <div>
      Thank you so much for to playing my game!
      <br />
      <button onClick={handleClick}>Epilogue</button>
    </div>
  );
};

export default Credits;

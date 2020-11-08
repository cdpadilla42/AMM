import React from 'react';
import styled from 'styled-components';

const StyledResponseBox = styled.div`
  width: 200px;
  height: 200px;
  background-color: #fff;
  border: 1px solid green;
`;

const ResponseBox = () => {
  return (
    <StyledResponseBox>
      <ul>
        <li>Response 1</li>
        <li>Response 2</li>
        <li>Response 3</li>
      </ul>
    </StyledResponseBox>
  );
};

export default ResponseBox;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledInventory = styled.div`
  width: 540px;
  height: 50%;
  border: 1px solid black;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
  background-color: palegoldenrod;
  border-radius: 5px;

  div {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0;
    background-color: #fff;
  }

  img {
    width: 100px;
    height: 100px;
  }

  span {
    display: block;
    flex: 1;
  }
`;

const Inventory = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // const inventory = useSelector((store) => store.inventory);
  // console.log(inventory);
  const dummyInventory = new Array(6);
  dummyInventory.fill({
    name: 'horse',
    image: 'https://f4.bcbits.com/img/a3261223391_2.jpg',
  });

  function renderInventory() {
    return dummyInventory.map((item) => {
      return (
        <div key={item.name}>
          <img src={item.image} alt="" />
          <span>{item.name}</span>
        </div>
      );
    });
  }
  return (
    <>
      {isDetailsOpen ? (
        <ItemDetailsDisplay />
      ) : (
        <StyledInventory>{renderInventory()}</StyledInventory>
      )}{' '}
      <img
        src="https://www.cheatcc.com/imageswii/phoenixwrightaceattorney_12a.jpg"
        alt=""
      />{' '}
    </>
  );
};

const ItemDetailsDisplay = () => {
  return <div>It's a horse!</div>;
};

export default Inventory;

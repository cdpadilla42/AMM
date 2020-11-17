import React from 'react';
import { useSelector } from 'react-redux';

const Inventory = () => {
  const inventory = useSelector((store) => store.inventory);
  console.log(inventory);

  function renderInventory() {
    return inventory.map((item) => {
      return <p key={item.name}>{item.name}</p>;
    });
  }
  return <div>{renderInventory()}</div>;
};

export default Inventory;

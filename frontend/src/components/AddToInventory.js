import React from 'react';
import useForm from '../hooks/useForm';

const AddToInventory = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({ item: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="item"
        id="item"
        value={inputs.item}
        onChange={handleChange}
      />
    </form>
  );
};

export default AddToInventory;

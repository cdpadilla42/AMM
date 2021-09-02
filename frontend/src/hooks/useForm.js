import { useEffect } from 'react';
import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  // * Use in case of inital state errors
  // useEffect(() => {
  //   setInputs(initial)
  // }, [initialValues])

  function handleChange(e) {
    let { name, type, value } = e.currentTarget;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.currentTarget.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const clearedObj = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(clearedObj);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

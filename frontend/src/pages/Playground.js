import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useHistory } from 'react-router';
import TestimonyImage from '../components/TestimonyImage';

const Playground = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <>
      <motion.div
        className="loader"
        transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] }}
        initial={{ transform: 'translateX(0%)' }}
        exit={{ transform: 'translateX(0%)' }}
        animate={{ transform: 'translateX(100%)' }}
        key="loader:playground"
      />
      <button onClick={handleClick}>Hey!</button>
    </>
  );
};

export default Playground;

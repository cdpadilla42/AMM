import { configureStore } from '@reduxjs/toolkit';

const rootReducer = () => 'cat';

const reducer = function (state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

const preloadedState = {
  text: ['hey'],
};

const store = configureStore({ reducer: reducer, preloadedState });

export default store;

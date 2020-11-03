import React from 'react';
import logo from './logo.svg';
import Testimony from './pages/Testimony';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Testimony />;
    </Provider>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import Testimony from './pages/Testimony';
import SelectConversation from './pages/SelectConversation';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <SelectConversation />
    </Provider>
  );
}

export default App;

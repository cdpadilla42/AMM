import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Testimony from './pages/Testimony';
import SelectConversation from './pages/SelectConversation';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/testimony">
            <Testimony />
          </Route>
          <Route path="/">
            <SelectConversation />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

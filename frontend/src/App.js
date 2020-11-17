import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Testimony from './pages/Testimony';
import SelectConversation from './pages/SelectConversation';
import Inventory from './components/Inventory';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/inventory">
            <Inventory />
          </Route>
          <Route
            path="/testimony/:id"
            render={(props) => <Testimony match={props.match} />}
          ></Route>
          <Route path="/">
            <SelectConversation />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

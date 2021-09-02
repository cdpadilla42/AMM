import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Testimony from './pages/Testimony';
import SelectConversation from './pages/SelectConversation';
import Map from './components/Map';
import store from './store/store';
import Playground from './pages/Playground';
import AddToInventory from './components/AddToInventory';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/addItemTest">
            <AddToInventory />
          </Route>
          <Route path="/inventory">
            <Map />
          </Route>
          <Route path="/playground">
            <Playground />
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

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Testimony from './pages/Testimony';
import SelectConversation from './pages/SelectConversation';
import Map from './components/Map';
import store from './store/store';
import Playground from './pages/Playground';
import SNotes from './components/SNotes';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/snotes">
            <ErrorBoundary>
              <SNotes />
            </ErrorBoundary>
          </Route>
          <Route path="/inventory">
            <Map />
          </Route>
          <Route path="/playground">
            <Playground />
          </Route>

          <Route
            path="/testimony/:id"
            render={(props) => (
              <ErrorBoundary>
                <Testimony match={props.match} />
              </ErrorBoundary>
            )}
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

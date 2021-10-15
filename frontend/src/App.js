import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './styles/customToast.css';
import Testimony from './pages/Testimony';
import SelectConversation from './pages/SelectConversation';
import Map from './components/Map';
import store from './store/store';
import Playground from './pages/Playground';
import SNotes from './components/SNotes';
import ErrorBoundary from './components/ErrorBoundary';
import { throttle } from 'lodash';

function App() {
  // For handling window resizing and iOS bottom bar
  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const handleWindowResize = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const handleWindowResizeButChill = throttle(handleWindowResize, 100);

    window.addEventListener('resize', handleWindowResizeButChill);

    return () => {
      window.removeEventListener('resize', handleWindowResizeButChill);
    };
  }, []);
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Switch>
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

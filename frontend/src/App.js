import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
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
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const location = useLocation();
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
    <Route
      render={({ location }) => {
        return (
          <TransitionGroup className="RTG">
            <CSSTransition
              key={location.key}
              timeout={600}
              classNames="page_transition"
            >
              <div>
                <Switch location={location} key={location.pathname}>
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
              </div>
            </CSSTransition>
          </TransitionGroup>
        );
      }}
    />
  );
}

export default App;

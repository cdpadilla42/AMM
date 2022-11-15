import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/customToast.css';
import './styles/gaegu_font.css';
import './styles/averia_libre_font.css';

import Testimony from './pages/Testimony';
import SelectConversation from './pages/SelectConversation';
import Playground from './pages/Playground';
import LandingPage from './pages/LandingPage';
import { getSprites } from './store/sprites';
import { throttle } from 'lodash';
import {
  getAnimalNotes,
  getInventoryItems,
  getMapLocations,
  getSNotes,
  initializeUserInventoryFromLocalStorage,
} from './store/inventory';
import ActOneTestimonySelect from './pages/ActOneTestimonySelect';
import ActThreeTestimonySelect from './pages/ActThreeTestimonySelect';
import { initializeUserAct3ScensFromLocalStorage } from './store/act3Scenes';
import Letter from './pages/Letter';
import PortfolioSelect from './pages/PortfolioSelect';
import Credits from './pages/Credits';
import Error from './components/Error';
import StartPage from './pages/Start';
import Support from './pages/Support';
import { getPictures } from './store/images';
import SoundController from './components/SoundController';

import useFetchAppLevelData from './hooks/useFetchAppLevelData';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchAppLevelDataRes = useFetchAppLevelData();

  // Get items for inventory, Animal notes & Agent S Notes, and sprites
  useEffect(() => {
    // dispatch(getSprites());
    // dispatch(getPictures());
    // dispatch(getInventoryItems());
    // dispatch(getAnimalNotes());
    // dispatch(getMapLocations());
    // dispatch(getSNotes());
    dispatch(initializeUserInventoryFromLocalStorage());
    dispatch(initializeUserAct3ScensFromLocalStorage());
  }, []);

  // For handling window resizing and iOS bottom bar
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.documentElement.style.setProperty('--vh', `1vh`);
      return;
    }
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
    <>
      <SoundController />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route
            path="/testimony/:id"
            render={(props) => <Testimony match={props.match} />}
          ></Route>
          <Route path="/act-one">
            <ActOneTestimonySelect />
          </Route>
          <Route path="/act-three">
            <ActThreeTestimonySelect />
          </Route>
          <Route path="/letter">
            <Letter />
          </Route>
          <Route path="/portfolio">
            <PortfolioSelect />
          </Route>
          <Route path="/credits">
            <Credits />
          </Route>
          <Route path="/play">
            <StartPage />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/uss">
            <SelectConversation />
          </Route>
          <Route path="/support">
            <Support />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;

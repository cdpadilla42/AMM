import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
// import ErrorBoundary from './components/ErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={10000} />
      <Router>
        <ErrorBoundary FallbackComponent={Error}>
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

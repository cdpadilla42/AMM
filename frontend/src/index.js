import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/ErrorBoundary';

setTimeout(() => {
  const errorElm = document.createElement('div');
  const errorHeader = document.createElement('h1');
  errorHeader.innerText = 'Woops! Something went wrong.';
  const errorText = document.createElement('p');
  errorText.innerText = 'Try refreshing and give it anorther whirl!';
  errorElm.appendChild(errorHeader);
  errorElm.appendChild(errorText);
  errorElm.class = 'error';

  document.body.appendChild(errorElm);
}, 5000);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ToastContainer autoClose={10000} />
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

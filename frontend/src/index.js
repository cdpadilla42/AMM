import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
// import ErrorBoundary from './components/ErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import Error from './components/Error';

if (!process?.env.NODE_ENV || process?.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://8b557b2aca04487cbf0b75807c738fda@o1345720.ingest.sentry.io/6622694',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastContainer autoClose={10000} />
        <Router>
          <ErrorBoundary FallbackComponent={Error}>
            <App />
          </ErrorBoundary>
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

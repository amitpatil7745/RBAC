import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// React Error Boundary
import ErrorBoundary from './components/ErrorBoundary';

// Optional: State management (if using Redux or Context)
// import { Provider } from 'react-redux';
// import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* Optional: Wrap with Provider if using state management */}
      {/* <Provider store={store}> */}
        <App />
      {/* </Provider> */}
    </ErrorBoundary>
  </React.StrictMode>
);
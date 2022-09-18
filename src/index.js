import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store/ReduxStore'
// import store from './store/Store'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


const { store, persistor } = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
reportWebVitals();

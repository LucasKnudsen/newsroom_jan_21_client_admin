import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './state/stores/configureStore'

axios.defaults.baseURL = 'http://localhost:3000/api'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

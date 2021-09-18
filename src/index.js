import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import './index.css';
import List from './List';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <List />
  </Provider>,
  document.getElementById('root')
);

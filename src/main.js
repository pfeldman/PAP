import React from 'react';
import ReactDOM from 'react-dom';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Routes from './routes';
import Root from './views/root.component';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

const initialState = window.__INITIAL_STATE__;

const routes = Routes();
// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} />,
  document.getElementById('root')
);

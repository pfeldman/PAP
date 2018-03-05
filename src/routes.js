import React from 'react';
import { Route } from 'react-router';
import App from './views/app.component';

export default () => (
  <Route>
    <Route path="/" component={App} />
  </Route>
);

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React Test"
      defaultTitle="React Test"
    >
      <meta name="description" content="React Test" />
    </Helmet>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </div>
);

export default App;

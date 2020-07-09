/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import {
  BrowserRouter as Router,
  Route
  
} from 'react-router-dom';
import DynamicApp from './DynamicApp';
import App from './App';
import Statements from './Statements';

export default class Routing extends React.Component {
  render() {
    return (
        <Router>
            <div>
            <Route exact path="/" component={App} />
            <Route path="/dynamic" component={DynamicApp} />
            <Route path="/statement" component={Statements} />
            </div>
        </Router>
    );
  }
}

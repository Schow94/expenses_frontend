import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ExpenseApp from './ExpenseApp';
import NoMatch from './NoMatch';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/OldApp" component={ExpenseApp}></Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './history';
import login from './pages/SignIn.js';


class App extends Component { 
  render() {
    return (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={login}/>
          </Switch>
        </Router>  
    );
  }
}

export default App;
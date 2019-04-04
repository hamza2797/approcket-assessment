import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './history';
import login from './pages/SignIn.js';
import landing from './pages/Landing.js';
import register from './pages/register.js';

class App extends Component { 
  render() {
    return (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={login}/>
            <Route exact path="/landing" component={landing}/>
            <Route exact path="/register" component={register}/>
          </Switch>
        </Router>  
    );
  }
}

export default App;
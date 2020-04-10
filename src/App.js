import React, {Component} from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';


export default class App extends Component {
constructor(props){
  super(props);
  this.state = {
    isLoggedIn: false,
    landlord: {}
  };
}

  render() {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={}/>
          <Route exact path='/login' component={}/>
          <Route exact path='/signup' component={}/>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

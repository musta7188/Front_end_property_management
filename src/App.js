import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import Paperbase from './components/dashboard/Paperbase'
import './App.css';

export default class App extends Component {
constructor(props){
  super(props);
  this.state = {
    landlordLogin: true,
    isLoggedIn: false,
    landlord: {},
    issues:{},
    tenants:{},
    todos:{},
    properties:{}
  };
}

componentDidMount(){
  this.loginStatus()
}

loginStatus = () => {
  axios.get('http://localhost:3001/logged_in', {withCredentials: true})
  .then(response => {
    if (response.data.logged_in){
      this.handleLogin(response.data)
    }else{
      this.handleLogout()
    }
  })
  .catch(error => console.log('api errors:', error))
}


handleLogin = (data) => {
  const {landlord, issues, tenants, todos, properties} = data
this.setState({
  isLoggedIn: true,
   landlord:landlord,
    issues:issues,
    tenants: tenants,
    todos: todos,
    properties: properties
})
}

handleLogout = () => {
  this.setState({
    isLoggedIn: false,
    landlord: {},
    issues:{},
    tenants:{},
    todos:{},
    properties:{}
  })
}

setValueAccess = (value) => {
  value == 'landlord' ? this.setState({landlordLogin:true}) : this.setState({landlordLogin:false})
  console.log(value)
}


 handleClick = () =>{

  axios.delete('http://localhost:3001/logout', {withCredentials: true})
  .then(response => {
    this.handleLogout()
    ///delete the props 
  this.history.push('/')
    //delete the props 
  })
  .catch(error => console.log(error))
}

renderDashboard = () => {
  return (
    <Paperbase logout={() => this.handleClick()} user={this.state.landlord} properties={this.state.properties}/>
    //paas landlord as state nad properties 
  )
}


render() {
  return (
    <div>
        { 
        this.state.isLoggedIn? this.renderDashboard() : 
     
     <BrowserRouter>
        <Switch>
       <Route 
        exact path='/' 
          render={props => (
          <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
        )}
           />
        <Route 
        exact path='/signup' 
        render={props => (
        <Signup {...props} setValueAccess={this.setValueAccess } handleLogin={this.handleLogin} 
        loggedInStatus={this.state.isLoggedIn}/>
        )}
      />
       </Switch>
      </BrowserRouter>
        }
    </div>
  );
}
}

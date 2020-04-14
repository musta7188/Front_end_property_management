import React, { Component } from 'react';
import axios from 'axios'
import { Switch, Route} from 'react-router-dom'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import Paperbase from './components/dashboard/Paperbase'
import {withRouter} from "react-router";
import './App.css';



 class App extends Component {
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
  }, () => {
    
    this.props.history.push('/dashboard')
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
  }, () => this.props.history.push('/login'))
}

setValueAccess = (value) => {
  value == 'landlord' ? this.setState({landlordLogin:true}) : this.setState({landlordLogin:false})
  
}


 handleClick = () =>{

  axios.delete('http://localhost:3001/logout', {withCredentials: true})
  .then(response => {
    this.handleLogout()
    ///delete the props 
  this.history.push('/login')
    //delete the props 
  })
  .catch(error => console.log(error))
}

renderDashboard = () => {
  return (

   <Route 
    exact path='/dashboard' 
    component={()=>  <Paperbase  logout={() => this.handleClick()} user={this.state.landlord} properties={this.state.properties}/>    }
    />
  )
  
}


render() {
  return (
    <div>
        { 
          this.state.isLoggedIn
          ? this.renderDashboard() 
          : <Switch>
            <Route 
              exact path='/login' 
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} setValueAccess={this.setValueAccess }  loggedInStatus={this.state.isLoggedIn}/>
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
        }
    </div>
  );
}
}

export default withRouter(App)
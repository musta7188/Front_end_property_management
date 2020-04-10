import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName:'',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
    };
  }

handleChange = (event) => {
  const {name, value} = event.target
  this.setState({
    [name]: value
  })
};

handleSubmit = (event) =>{
event.preventDefault()
};


  render() {
    const {firstName, lastName, email, password, password_confirmation} = this.state
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
        <input
        placeholder="firstName"
        type="text"
        name="firstName"
        value={firstName}
        onChange={this.handleChange}
        />
        <input
        placeholder="lastName"
        type="text"
        name="lastName"
        value={lastName}
        onChange={this.handleChange}
        />
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
               placeholder="password"
               type="password"
               name="password"
               value={password}
               onChange={this.handleChange}
        />
        <input
               placeholder="password confirmation"
               type="password"
               name="password_confirmation"
               value={password_confirmation}
               onChange={this.handleChange}
        />
        <button placeholder="submit" type="submit">
          Sign Up
        </button>
        <div>
          or <Link to='/login'>Log In</Link>
        </div>
        </form>
      </div>
    );
  }
}

import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name: '',
      email: '',
      password: '',
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
    const {first_name, last_name, email, password} = this.state
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
        <input
        placeholder="first name"
        type="text"
        name="first name"
        value={first_name}
        onChange={this.handleChange}
        />
        <input
        placeholder="last name"
        type="text"
        name="last_name"
        value={last_name}
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
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to='/signup'>sign up</Link>
        </div>
        </form>
      </div>
    );
  }
}

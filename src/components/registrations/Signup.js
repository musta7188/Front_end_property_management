import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name: '',
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
const {first_name, last_name, email, password, password_confirmation} = this.state

let user = {
  first_name: first_name,
  last_name: last_name,
  email: email,
  password: password,
  password_confirmation: password_confirmation
}

axios.post('http://localhost:3001/landlords',{user}, {withCredentials: true})
.then(response => {
  if (response.data.status === 'created'){
    this.props.handleLogin(response.data)
    this.redirect()
  }else {
    this.setState({
      errors: response.data.errors
    })
  }
})
.catch(error => console.log('api errors:', error))

};

redirect = () =>{
  return (
    <div>
      <ul>
        {this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}
      </ul>
    </div>
  )
}

  render() {
    const {first_name, last_name, email, password, password_confirmation} = this.state
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
        <input
        placeholder="first name"
        type="text"
        name="first_name"
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

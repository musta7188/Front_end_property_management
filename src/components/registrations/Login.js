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
const {first_name, last_name, email, password} = this.state

let landlord = {
  first_name: first_name,
  last_name: last_name,
  email: email,
  password: password
}

axios.post('http://localhost:3001/login', {landlord}, {withCredentials: true})
.then(response => {
  if (response.data.logged_in){
    this.props.handleLogin(response.data)
    this.redirect()
  }else{
    this.setState({
      error: response.data.errors
    })
  }
})
.catch(error => console.log('api errors:', error))
};

redirect = () =>{
  this.props.history.push('/')
}

handleErrors = () =>{
  return(
    <div>
      <ul>
        {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
        })}
      </ul>
    </div>
  )
}


  render() {
    const {first_name, last_name, email, password, errors} = this.state
    return (
      <div>
        <h1>Log In</h1>
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
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to='/signup'>Sign up</Link>
        </div>
        </form>
        <div>
          {errors? this.handleErrors(): null}
        </div>
      </div>
    );
  }
}

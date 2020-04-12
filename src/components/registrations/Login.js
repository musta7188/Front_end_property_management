import React, { Component } from 'react'
import axios from 'axios'
import SignInSide from './registrationForms/SignInSide'
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
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
  const {email, password} = this.state

  const landlord = {
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
        errors: response.data.errors
      })
    }
  })
 
  .catch(error => console.log('api errors:', error))
  };


redirect = () =>{
  ///redirect the user to another track
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

componentWillMount(){
  return this.props.loggedInStatus ? this.redirect() : null
}


  render() {
    const { email, password, errors} = this.state
    return (
      <div>
        <div>
          {errors? this.handleErrors(): null}
        </div>

        <SignInSide setValueAccess={this.props.setValueAccess } handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange} email={email} 
        password={password} errors={errors}
        
        />
      </div>
    );
  }
}
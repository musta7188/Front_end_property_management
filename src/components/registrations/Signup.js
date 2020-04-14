import React, { Component } from 'react'
import axios from 'axios'

import SignUpSide from './registrationForms/SignUpSide'
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
let landlord = {
  first_name: first_name,
  last_name: last_name,
  email: email,
  password: password,
  password_confirmation: password_confirmation
}

axios.post('http://localhost:3001/landlords',{landlord}, {withCredentials: true})
.then(response => {
  if (response.data.status == 200){
    this.props.handleLogin(response.data)
    // this.redirect()
  }else {
    this.setState({
      errors: response.errors
    })
  }
})
.catch(error => console.log('api errors:', error))

};

// redirect = () => {
//   this.props.history.push('/dashboard')
// }

handleErrors= () =>{
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

componentWillMount() {
  return this.props.loggedInStatus ? this.redirect() : null
}

  render() {
    const {first_name, last_name, email, password, password_confirmation, errors } = this.state
    return (
      <div>
        <div>
          {
            errors ? this.handleErrors() : null
          }
        </div>
        <SignUpSide setValueAccess={this.props.setValueAccess}
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange} email={email} 
        password={password} first_name={first_name} last_name={last_name}
        password_confirmation={password_confirmation}
         errors={errors}
        />
      </div>
    );
  }
}
import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

import Login from './registrations/Login'


const Home = (props) => {

  const handleClick = () =>{

    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  const renderDashboard = () => {
    return (
      <div>
        <Link to='/logout' onClick={handleClick} >Log Out</Link>
        <h1>ahuahauhau</h1>
      </div>
    )
  }


  return(
    <div>
      { props.loggedInStatus ? renderDashboard() : 
      <Login setValueAccess={props.setValueAccess} loggedInStatus={props.loggedInStatus} handleLogin={props.handleLogin} />
    }
    </div>
  );
};

export default Home;
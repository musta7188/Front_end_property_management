import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Home = (props) => {

  const handleClick = () =>{

    axios.delete('http://localhost:3001/logout')
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  const renderDashboard = () => {
    return (
      <h1>ahuahauhau</h1>
    )
  }

  return(
    <div>
      <Link to='/login'>Log In</Link>
      <br></br>
      <Link to='/signup'>Sign Up</Link>
      <br></br>
      { props.loggedInStatus ? <Link to='/logout' onClick={handleClick} >Log Out</Link> : null}
      {(Object.keys(props.user).length > 0 && props.user.constructor === Object) ? renderDashboard() : null}
    </div>
  );
};

export default Home;
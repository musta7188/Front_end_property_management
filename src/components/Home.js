import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Home = (props) => {

  const handleClick = () =>{

    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  
  return(
    <div>
      { props.loggedInStatus ?
      <Link to='/logout' onClick={handleClick} >Log Out</Link> :  
     <div> <Link to='/login'>Log In</Link> 
     <br></br> 
     <Link to='/signup'>Sign Up</Link></div>
    }
    </div>
  );
};

export default Home;
import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
<<<<<<< HEAD
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paperbase from './dashboard/Paperbase'
=======

import Login from './registrations/Login'

>>>>>>> merge_login_log_out_template

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
      <Paperbase logout={() => handleClick()} user={props.user}/>
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
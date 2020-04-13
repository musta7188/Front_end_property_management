import React from 'react';
import axios from 'axios'
import Paperbase from './dashboard/Paperbase'
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
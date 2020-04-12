import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paperbase from './dashboard/Paperbase'

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
  
  const [value, setValue] = React.useState( 'landlord');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setValueAccess(event.target.value)
   
  };

  
  return(
    <div>
      { props.loggedInStatus ?
      renderDashboard() :  
     <div> <Link to='/login'>Log In</Link> 
     <br></br> 
     <Link to='/signup'>Sign Up</Link>
     <br></br>  
     <br></br>
     <FormControl component="fieldset">
      <FormLabel component="legend">Access as:</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="landlord" control={<Radio />} label="landlord" />
        <FormControlLabel value="tenant" control={<Radio />} label="tenant" />
      </RadioGroup>
    </FormControl>
     
     
     
     </div>
    }
    </div>
  );
};

export default Home;
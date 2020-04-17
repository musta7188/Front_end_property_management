import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const IssueList = () => {
  

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [nonCompleted, setNonCompleted] = React.useState(false)


  const handleToggle = (issue) => () => {
    

    const confObj = {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        isCompleted: !issue.isCompleted
      })
    }

    fetch(`http://localhost:3001/issues/${issue.id}`, confObj)
    .then(resp => resp.json())
    .then(obj => getIssues())
    
  };



const  getIssues = () => {

    fetch("http://localhost:3001/issues")
    .then(resp => resp.json())
    .then( obj => {
      
      let objRender = nonCompleted? obj.issues.filter(issue => issue.isCompleted === false) : obj.issues
      
      setChecked(objRender)})
  }



  useEffect(() => {
    getIssues()
      
    }, [])

    const handeClick = () => {

      setNonCompleted(!nonCompleted)
      getIssues()
    }




    return (    
      <div>
        <Button onClick={() => handeClick()} variant="contained" color={ nonCompleted?  "secondary" : "primary"}>
  {nonCompleted?   "Non Completed" : "All Todos"}
</Button>
 
      <br></br>
      
      <List dense className={classes.root}>

      
        {
        
        
        checked.map((issue) => {
          const labelId = `checkbox-list-secondary-label-${issue.message}`;
          
          return (
           
        
            <ListItem key={issue.id} button>
         
              <ListItemAvatar>
            
                <Avatar
             
                  src=  {issue.isCompleted === true? "https://lh3.googleusercontent.com/YoZLPLcTuAZv2_04F5Rr1mmDoBYH9hxBZmusLpW2Dk4ycsbLydBBpC4b3q1YgG4c9ls" :"https://www.stickertalk.com/wp-content/uploads/2018/07/D-90-147.jpg"}
                />
              </ListItemAvatar>
              <Link key={issue.id} to={`/issues/${issue.id}`}  >  <ListItemText id={labelId} primary={` ${issue.message}`} />   </Link>
              <ListItemSecondaryAction>
    
                <Checkbox
                
                  edge="end"
                  onChange={(handleToggle(issue))}
                  checked={issue.isCompleted? true : false}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
           
              </ListItemSecondaryAction>
            </ListItem>
         
          );
        })}
      </List>
      </div>

    );
    
      }


export default IssueList





  
  

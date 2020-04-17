import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));



const TodoList = () => {

  const classes = useStyles();
  const [todos, setTodos] = React.useState([]);

  const getTodos = () => {
    fetch("http://localhost:3001/todos")
    .then(resp => resp.json())
    .then(data => {setTodos(data.todos)})
  }


  useEffect(() => {
    getTodos()
      
    }, [])





  return (
    <List className={classes.root}>

      
    {todos.map((todo) => {
    
      
      return (
       
        
        <ListItem alignItems="flex-start">
     
     <ListItemAvatar>
          <Avatar alt="" src="https://lh3.googleusercontent.com/proxy/cC8Pjjfi2eg_Z2yaJpXp0Spc1gC8RyMMgWNRLzNHLvB_y0_tiBfnbfsbGpDIqNCJwAFWgkqxePm4crWGqs3ZVb1m25HOLcARlA" />
        </ListItemAvatar>
        <ListItemText
          primary={todo.message}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Property: 
              </Typography>
              {todo.property.address}
            </React.Fragment>
          }
        />
        </ListItem>
         
     
      );
    })}
  </List>
  )


}

export default TodoList;






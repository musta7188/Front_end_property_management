import React from 'react'

import {Link} from 'react-router-dom';

const TodoList = ({todos}) => {

const renderTodos = Object.keys(todos).map(todoID => 
  
  <Link key={todoID} to={`/todos/${todoID}`}>
    <h1> {todos[todoID].message} </h1>
  
  </Link>
  
  )

  return (
    <div>
      {renderTodos}
    </div>
  )


}

export default TodoList;
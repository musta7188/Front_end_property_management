import React from 'react'

import {Link} from 'react-router-dom';

const TodoList = ({todos}) => {


const renderTodos = todos.map(todo => 
  
  <Link key={todo.id} to={`/todos/${todo.id}`}>
    <h1> {todo.message} </h1>
  
  </Link>
  
  )

  return (
    <div>
      {renderTodos}
    </div>
  )


}

export default TodoList;
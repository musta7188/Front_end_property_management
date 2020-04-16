import React from 'react'
import {Route} from 'react-router-dom';
import TodoList from './TodoList'
import TodoDetails from './TodoDetails'

const TodosPage = ({match, todos}) => {

return (
<div>
<Route exact path={'/todos'} render={() => <TodoList todos={todos}/>}   />

<Route exact path={`/todos/:todoID`} render={ propsTodos => 
<TodoDetails {...propsTodos} todos={todos} />

}
/>
</div>

)


}


export default TodosPage;
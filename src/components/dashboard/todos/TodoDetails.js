import React from 'react'

const TodoDetails = ({match, todos}) => {

return(
<div>
<h1>{todos[match.params.todoID].message}</h1>
</div>


)

}

export default TodoDetails
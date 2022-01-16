import Checkbox from './Checkbox';

import './Todo.css'

function Todo(props) {
  return (
    <div className='todo'>
      <Checkbox />
      <div className='todo-body'>
        {props.todo.title}
      </div>
    </div> 
  )
}

export default Todo;
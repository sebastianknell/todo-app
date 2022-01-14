import './Todo.css'

function Todo(props) {
  return (
    <div className='todo'>
      <div className='checkbox'></div>
      <div className='todo-body'>
        {props.todo.title}
      </div>
    </div> 
  )
}

export default Todo;
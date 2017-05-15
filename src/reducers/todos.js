
function todos(state = [], action){
   switch (action.type) {
    case 'TODOS_RECEIVE_DATA':
      let todos = []
      if (action.data){
        Object.keys(action.data).forEach(key =>{
          let todo = action.data[key];
          todos.push({
            key: key,
            text: todo.text,
            completed: todo.completed,
          })
        });
      }
      return [...todos]

    case 'TODOS_RECEIVE_ERROR':
    case 'ADD_TASK_ERROR':
    case 'UPDATE_TASK_ERROR':
    case 'DELETE_TASK_ERROR':
      alert(action.message)

    default:
      return state
  }
}

export default todos

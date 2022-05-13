
export const createTodo = (todo) => {
  return{
    type: 'CREATE',
    data: todo
  }
}

export const clear = (task) => {
  return{
    type: 'CLEAR',
    data: task
  }
}

export const Allcompleted = () => {
  return{
    type: 'COMPLETED',
    data: true
  }
}

export const active = () => {
  return{
    type: 'ACTIVE',
    data: false
  }
}

export const complete = (task) => {

  return{
    type: 'COMPLETE',
    data: task
  }
}
export const clearAllCompleted = () => {
  return {
    type: 'CLEAR-COMPLETED',
    data: true
  }
}
export const updateTaskList = (tasks) => {
  return{
    type: 'UPDATE',
    data: tasks

  }
}
const initialTodo = [
  {
    'name': 'implement change of theme',
    'completed': true,
    'id': 'implement change of theme'

  },
  {
    'name':'commit change to GitHub',
    'completed': false,
    'id': 'commit change to GitHub'
  },
  {
    'name':'host the application on heroku',
    'completed': false,
    'id': 'host the application on heroku'
  },
  {
    'name':'meditate for 10 mins',
    'completed': true,
    'id': 'meditate for 10 mins'
  },
  {
    'name':'jog around the park x3',
    'completed': false,
    'id': 'jog around the park x3'
  },
  {
    'name':'make appointment with the doctor',
    'completed': false,
    'id': 'make appointment with the doctor'
  }
]

const reducer = (state = initialTodo, action) => {
  switch(action.type){
  case 'CREATE':
    return state.concat(action.data)
  case 'COMPLETED':
    return state.filter(state => state.completed === action.data)
  case 'CLEAR':
    return state.filter(state => state.id !== action.data.id)
  case 'ACTIVE':
    return state.filter( state => state.completed === action.data)
  case 'COMPLETE':
    return state.map(state => state.id !== action.data.id ? state : { ...action.data, completed :!action.data.completed })
  case 'CLEAR-COMPLETED':
    return state.filter(state => state.completed !== action.data)
  case 'UPDATE':
    return action.data

  default:
    return state

  }
}

export default reducer
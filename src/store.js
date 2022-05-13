import { createStore, combineReducers } from 'redux'
import themeReducer from './reducer/themeReducer'
import todoReducer from './reducer/todoReducer'

const reducer = combineReducers({
  theme : themeReducer,
  todo: todoReducer
})

const store = createStore( reducer)

export default store
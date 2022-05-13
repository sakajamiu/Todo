

export const changeTheme = (isLight) => {
  return{
    type: 'CHANGE-THEME',
    data: isLight
  }
}

const reducer = (state = true, action) => {
  switch(action.type){
  case 'CHANGE-THEME':
    return !action.data
  default:
    return state
  }
}

export default reducer
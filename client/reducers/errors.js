
function errors(state = [], action) {
  switch(action.type) {

    case 'SET_ERROR':
      return {
        ...state,
        [action.code]: action.description
      }

    default:
      return state;
  }
}

export default errors;
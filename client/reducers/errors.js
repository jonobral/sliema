
function errors(state = [], action) {
  switch(action.type) {

    case 'SET_ERROR':
      return {
        ...state,
        [action.code]: action.description
      }

    case 'CLEAR_ERROR':
      return {};

    default:
      return state;
  }
}

export default errors;
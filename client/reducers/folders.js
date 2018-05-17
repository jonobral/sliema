
function folders(state = [], action) {
  switch(action.type) {

    case 'SET_FOLDERS':
      return [
        ...state,
        ...action.payload.map((entry) => ({
          id: entry._id,
          name: entry.name,
          path: entry.path
        }))
      ]

    default:
      return state;
  }
}

export default folders;
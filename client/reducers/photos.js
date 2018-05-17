
function photos(state = [], action) {
  switch(action.type) {

    case 'DATABASE_SUCCESS':
      return {
        ...state,
        ...action.payload.reduce((result, photo) => ({
          ...result,
          [action.folderId]: [
            ...(result[action.folderId] || []),
            {
              id: photo._id,
              name: photo.name,
              path: photo.path,
              likes: photo.likes,
              created: photo.created
            }
          ]}),
          {})
        }

    case 'INCREMENT_LIKES':
      const i = action.index;
      return {
        ...state,
        [action.folderId]: [
          ...state[action.folderId].slice(0, i),
          {
            ...state[action.folderId][i], 
            likes: action.likes
          },
          ...state[action.folderId].slice(i + 1)
        ]
      }
    default:
      return state;
  }
}

export default photos;
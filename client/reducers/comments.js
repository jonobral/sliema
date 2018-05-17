function postComments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, {
        id: action.commentId,
        author: action.author,
        comment: action.comment,
        isLocked: false
      }];
    case 'REMOVE_COMMENT':
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ]
    defailt:
      return state;
  }
  return state;
}

function comments(state = [], action) {
  if (action.photoId) {
    return {
      ...state,
      [action.photoId]: postComments(state[action.photoId], action)
    }
  } else {
    if (action.type === 'LOAD_COMMENTS') {
      return {
        ...state,
        ...action.payload.reduce((result, comment) => ({
          ...result,
          [comment.photoId]: [
            ...(result[comment.photoId] || []),
            {
              id: comment._id,
              author: comment.author,
              comment: comment.comment,
              isLocked: comment.isLocked
            }
          ]}),
          {})
      }
    }
  }
  return state;
}

export default comments;
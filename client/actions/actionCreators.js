export function fetchPostsRequest(){
  return {
    type: 'FETCH_REQUEST'
  }
}

export function fetchPostsError() {
  return {
    type: 'FETCH_ERROR'
  }
}

export function fetchDatabaseRecords(payload, folderId) {
  return {
    type: 'DATABASE_SUCCESS',
    payload,
    folderId
  }
}

export function setFolders(payload) {
  return {
    type: 'SET_FOLDERS',
    payload
  }
}

// increment likes
export function increment(index, likes, folderId) {
  return {
    type: 'INCREMENT_LIKES',
    index,
    likes,
    folderId
  }
}

// add comment
export function addInitialComments(payload) {
  return {
    type: 'LOAD_COMMENTS',
    payload
  }
}

// add comment
export function addComment(photoId, author, comment, commentId) {
  return {
    type: 'ADD_COMMENT',
    photoId,
    author,
    comment,
    commentId
  }
}

// remove comment
export function removeComment(photoId, i) {
  return {
    type: 'REMOVE_COMMENT',
    i,
    photoId
  }
}

export function displayError(code, description) {
  return {
    type: 'SET_ERROR',
    code,
    description
  }
}

export function clearError(code) {
  return {
    type: 'CLEAR_ERROR',
    code
  }
}
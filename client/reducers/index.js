import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import photos from './photos';
import comments from './comments';
import folders from './folders';
import errors from './errors';

const rootReducer = combineReducers({
  photos,
  comments,
  folders,
  errors,
  routing: routerReducer
});

export default rootReducer;
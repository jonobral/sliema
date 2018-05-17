import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import photos from './photos';
import comments from './comments';
import folders from './folders';

const rootReducer = combineReducers({
  photos,
  comments,
  folders,
  routing: routerReducer
});

export default rootReducer;
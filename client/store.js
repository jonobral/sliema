import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducers
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

// create an object for the default data
const defaultState = {
  posts,
  comments
};

var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'JM7rjd0TxhcAAAAAAAEDLj8cC0Ap9asSfryvzsWzF9fyCNR2INJblUPRLxsUxN1w' });
dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log('Done: ');
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;

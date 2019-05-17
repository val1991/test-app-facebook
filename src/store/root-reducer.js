import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import postReducer from './modules/post';

export default (history) => combineReducers({
  router: connectRouter(history),
  posts: postReducer,
});
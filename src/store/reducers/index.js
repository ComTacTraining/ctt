import { combineReducers } from 'redux';
import user from './user';
import evolution from './evolution';
import ai from './ai';
import tips from './tips';
import evaluation from './evaluation';

const reducer = combineReducers({
  user,
  evolution,
  ai,
  tips,
  evaluation,
});

export default reducer;

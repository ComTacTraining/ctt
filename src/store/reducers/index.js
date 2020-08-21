import { combineReducers } from 'redux';
import user from './user';
import evolution from './evolution';
import ai from './ai';

const reducer = combineReducers({
  user,
  evolution,
  ai,
});

export default reducer;

import { combineReducers } from 'redux'
import ai from './ai'
import command from './command'
import evaluation from './evaluation'
import evolution from './evolution'
import review from './review'
import screen from './screen'
import tips from './tips'
import units from './units'
import user from './user'


const reducer = combineReducers({
  ai,
  command,
  evaluation,
  evolution,
  review,
  screen,
  tips,
  units,
  user
})

export default reducer

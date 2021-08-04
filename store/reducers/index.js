import ai from '@/store/reducers/ai'
import command from '@/store/reducers/command'
import evaluation from '@/store/reducers/evaluation'
import evolution from '@/store/reducers/evolution'
import review from '@/store/reducers/review'
import screen from '@/store/reducers/screen'
import tips from '@/store/reducers/tips'
import units from '@/store/reducers/units'
import user from '@/store/reducers/user'
import { combineReducers } from 'redux'

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

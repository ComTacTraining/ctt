import { initialState as aiInitialState } from '@/store/reducers/ai'
import { initialState as commandInitialState } from '@/store/reducers/command'
import { initialState as evaluationInitialState } from '@/store/reducers/evaluation'
import { initialState as evolutionInitialState } from '@/store/reducers/evolution'
import { initialState as reviewInitialState } from '@/store/reducers/review'
import { initialState as screenInitialState } from '@/store/reducers/screen'
import { initialState as tipsInitialState } from '@/store/reducers/tips'
import { initialState as unitsINitialState } from '@/store/reducers/units'
import { initialState as userInitialState } from '@/store/reducers/user'

const initialState = {
  ai: aiInitialState,
  command: commandInitialState,
  evaluation: evaluationInitialState,
  evolution: evolutionInitialState,
  review: reviewInitialState,
  screen: screenInitialState,
  tips: tipsInitialState,
  units: unitsINitialState,
  user: userInitialState
}

export { initialState }

import { initialState as aiInitialState } from './ai'
import { initialState as commandInitialState } from './command'
import { initialState as evaluationInitialState } from './evaluation'
import { initialState as evolutionInitialState } from './evolution'
import { initialState as reviewInitialState } from './review'
import { initialState as screenInitialState } from './screen'
import { initialState as tipsInitialState } from './tips'
import { initialState as unitsINitialState } from './units'
import { initialState as userInitialState } from './user'

const initialState = {
  ai: aiInitialState,
  command: commandInitialState,
  evaluation: evaluationInitialState,
  evolution: evolutionInitialState,
  review: reviewInitialState,
  screen: screenInitialState,
  tips: tipsInitialState,
  units: unitsINitialState,
  user: userInitialState,
};

export { initialState }


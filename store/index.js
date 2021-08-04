import rootReducer from '@/store/reducers'
import { initialState } from '@/store/reducers/initialState'
import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore
} from 'redux'
import thunk from 'redux-thunk'

const createStore = (state = initialState) => {
  const hasWindow = typeof window !== 'undefined'
  const composeEnhancer = hasWindow
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose
  const enhancer = composeEnhancer(applyMiddleware(thunk))

  return reduxCreateStore(rootReducer, state, enhancer)
}

export { createStore }

import { initialState as userInitialState } from './user';
import { initialState as evolutionInitialState } from './evolution';
import { initialState as aiInitialState } from './ai';

const initialState = {
  user: userInitialState,
  evolution: evolutionInitialState,
  ai: aiInitialState,
};

export { initialState };

import { initialState as userInitialState } from "./user";
import { initialState as evolutionInitialState } from "./evolution";
import { initialState as aiInitialState } from "./ai";
import { initialState as tipsInitialState } from "./tips";
import { initialState as evaluationInitialState } from "./evaluation";

const initialState = {
  user: userInitialState,
  evolution: evolutionInitialState,
  ai: aiInitialState,
  tips: tipsInitialState,
  evaluation: evaluationInitialState
};

export { initialState };

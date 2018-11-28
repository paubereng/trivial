import { combineReducers } from 'redux';
import GameOptionsReducer from './GameOptionsReducer';

const rootReducer = combineReducers({
  gameOptions: GameOptionsReducer
});

export default rootReducer;

import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { omdbReducer } from './Reducers/omdbReducer';

export const intitialState = Immutable.Map();

export default combineReducers({
  omdbReducer,
});

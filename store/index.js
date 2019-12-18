import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer, { intitialState } from './RootReducers';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export function configureStore(state = {}) {
  const store = createStore(
    RootReducer,
    state,
    bindMiddleware([thunkMiddleware])
  );
  return store;
}

export default configureStore;

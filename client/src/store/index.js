import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';

const store = createStore(
  combineReducers({
    auth: authReducer
  }),
  applyMiddleware(thunkMiddleware)
);

export default store;

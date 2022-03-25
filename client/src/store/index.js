import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { userReducer } from './reducers/userReducer';
import { goalReducer } from './reducers/goalReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
  user: userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;

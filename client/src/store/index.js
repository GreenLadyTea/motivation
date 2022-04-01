import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { userGoalsReducer } from './reducers/userGoalsReducer';
import { goalReducer } from './reducers/goalReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
  userGoals: userGoalsReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;

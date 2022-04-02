import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { userGoalsReducer } from './reducers/userGoalsReducer';
import { goalsReducer } from './reducers/goalsReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalsReducer,
  userGoals: userGoalsReducer,
  users: usersReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;

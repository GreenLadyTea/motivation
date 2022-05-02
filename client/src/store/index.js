import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './reducers/profileReducer';
import { goalsReducer } from './reducers/goalsReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalsReducer,
  profile: profileReducer,
  users: usersReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;

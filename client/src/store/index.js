import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './reducers/profileReducer';
import { goalsReducer } from './reducers/goalsReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { usersReducer } from './reducers/usersReducer';
import { otherProfileReducer } from './reducers/otherProfileReducer';
import { goalPageReducer } from './reducers/goalPageReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalsReducer,
  goalPage: goalPageReducer,
  profile: profileReducer,
  otherProfile: otherProfileReducer,
  users: usersReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;

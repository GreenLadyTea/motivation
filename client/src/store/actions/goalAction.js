import api from '../../api/Api';

export const GOAL_ACTIONS = {
  CREATE_NEW_GOAL: 'createNewGoal'
};

export const createNewGoal = goal => ({
  type: GOAL_ACTIONS.CREATE_NEW_GOAL,
  payload: goal
});

export const create = (title, description, term) => async dispatch => {
  const response = await api.createNew(title, description, term);
  let goal = await response.json();
  console.log(goal);
  dispatch(createNewGoal({ goal }));
};

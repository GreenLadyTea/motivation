import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';
import { getUserNewGoals } from '../store/actions/otherProfileActions';

export default function UserNewGoalsList({ username }) {
  const goals = useSelector(state => state.otherProfile.newGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserNewGoals(username));
  }, []);

  function renderList() {
    if (!goals.length) {
      return `Текущих целей у пользователя ${username} ещё нет`;
    }
    return (
      <>
        <Stack gap={3} className="col-md-6">
          {goals.map(goal => (
            <GoalCard
              key={goal._id}
              id={goal._id}
              title={goal.title}
              status={goal.status}
              username={false}
              description={goal.description}
              createdAt={goal.createdAt}
              term={goal.term}
            />
          ))}
        </Stack>
      </>
    );
  }
  return (
    <>
      <div>{renderList()}</div>
    </>
  );
}

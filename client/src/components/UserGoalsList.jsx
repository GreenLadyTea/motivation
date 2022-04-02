import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../store/actions/userGoalsActions';
import UserGoalCard from './UserGoalCard';
import { Stack } from 'react-bootstrap';

export default function UserGoalsList() {
  const goals = useSelector(state => state.userGoals.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoals());
  }, []);

  function renderList() {
    if (!goals.length) {
      return 'Никаких целей ещё нет';
    }
    return (
      <>
        <Stack gap={3} className="col-md-6">
          {goals.map(goal => (
            <UserGoalCard
              key={goal._id}
              id={goal._id}
              title={goal.title}
              description={goal.description}
              createdAt={goal.createdAt}
              term={goal.term}
              status={goal.status}
            />
          ))}
        </Stack>
      </>
    );
  }
  return (
    <>
      <div data-testid="list">{renderList()}</div>
    </>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';
import { getUserGoals } from '../store/actions/otherProfileActions';

export default function UserGoalsList({ username }) {
  const goals = useSelector(state => state.otherProfile.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserGoals(username));
  }, []);

  function renderList() {
    if (!goals.length) {
      return 'Никаких целей ещё нет';
    }
    return (
      <>
        <Stack gap={3} className="col-md-6">
          {goals.map(goal => (
            <GoalCard
              key={goal._id}
              id={goal._id}
              title={goal.title}
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

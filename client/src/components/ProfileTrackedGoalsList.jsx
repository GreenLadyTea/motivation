import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';
import { getTrackedGoals } from '../store/actions/profileActions';

export default function ProfileTrackedGoalsList({ username }) {
  const goals = useSelector(state => state.profile.trackedGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrackedGoals(username));
  }, [goals]);

  function renderList() {
    if (!goals.length) {
      return 'Отслеживаемых целей ещё нет';
    }
    return (
      <>
        <Stack gap={3} className="col-md-8">
          {goals.map(goal => (
            <GoalCard
              key={goal._id}
              id={goal._id}
              title={goal.title}
              username={goal.username}
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

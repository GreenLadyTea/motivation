import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { getTrackedGoals } from '../store/actions/profileActions';
import TrackedGoalCard from './TrackedGoalCard';

export default function ProfileTrackedGoalsList({ username }) {
  const goals = useSelector(state => state.profile.trackedGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrackedGoals(username));
  }, []);

  function renderList() {
    if (!goals.length) {
      return 'Отслеживаемых целей ещё нет';
    }
    return (
      <>
        <Stack gap={3} className="col-md-8">
          {goals.map(goal => (
            <TrackedGoalCard
              key={goal._id}
              id={goal._id}
              status={goal.status}
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

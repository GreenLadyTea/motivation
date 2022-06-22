import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFailedGoals } from '../store/actions/profileActions';
import ProfileGoalCard from './ProfileGoalCard';
import { Stack } from 'react-bootstrap';

export default function ProfileFailedGoalsList() {
  const goals = useSelector(state => state.profile.failedGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFailedGoals());
  }, []);

  function renderList() {
    if (!goals.length) {
      return 'Вы ещё не провалили ни одной цели!';
    }
    return (
      <>
        <Stack gap={3} className="col-md-8">
          {goals.map(goal => (
            <ProfileGoalCard
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

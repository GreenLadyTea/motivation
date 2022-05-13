import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../store/actions/profileActions';
import ProfileGoalCard from './ProfileGoalCard';
import { Stack } from 'react-bootstrap';

export default function ProfileGoalsList() {
  const goals = useSelector(state => state.profile.goals);
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

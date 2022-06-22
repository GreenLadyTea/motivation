import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApprovedGoals, getDoneGoals } from '../store/actions/profileActions';
import ProfileGoalCard from './ProfileGoalCard';
import { Stack } from 'react-bootstrap';

export default function ProfileSucceedGoalsList() {
  const doneGoals = useSelector(state => state.profile.doneGoals);
  const approvedGoals = useSelector(state => state.profile.approvedGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoneGoals()).then(dispatch(getApprovedGoals()));
  }, []);

  function renderList() {
    if (!doneGoals.length && !approvedGoals.length) {
      return 'Вы ещё не выполнили ни одну цель!';
    }
    return (
      <>
        <Stack gap={3} className="col-md-8">
          {doneGoals.map(goal => (
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
        <Stack gap={3} className="col-md-8">
          {approvedGoals.map(goal => (
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
      <div>{renderList()}</div>
    </>
  );
}

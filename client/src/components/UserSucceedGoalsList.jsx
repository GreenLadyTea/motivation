import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';
import { getUserApprovedGoals, getUserDoneGoals } from '../store/actions/otherProfileActions';

export default function UserSucceedGoalsList({ username }) {
  const doneGoals = useSelector(state => state.otherProfile.doneGoals);
  const approvedGoals = useSelector(state => state.otherProfile.approvedGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDoneGoals(username)).then(dispatch(getUserApprovedGoals(username)));
  }, []);

  function renderList() {
    if (!doneGoals.length && !approvedGoals.length) {
      return `Пользователь ${username} ещё не выполнил ни одну цель!`;
    }
    return (
      <>
        <Stack gap={3} className="col-md-6">
          {doneGoals.map(goal => (
            <GoalCard
              key={goal._id}
              id={goal._id}
              title={goal.title}
              username={false}
              status={goal.status}
              description={goal.description}
              createdAt={goal.createdAt}
              term={goal.term}
            />
          ))}
        </Stack>
        <Stack gap={3} className="col-md-6">
          {approvedGoals.map(goal => (
            <GoalCard
              key={goal._id}
              id={goal._id}
              title={goal.title}
              username={false}
              status={goal.status}
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

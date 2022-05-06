import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllGoals } from '../store/actions/goalsActions';
import { Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';

export default function AllGoalsList() {
  const goals = useSelector(state => state.goals.goals);
  const userId = useSelector(state => state.auth.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGoals(userId));
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

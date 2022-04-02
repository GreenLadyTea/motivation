import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllGoals } from '../store/actions/goalsActions';
import { Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';

export default function AllGoalsList() {
  const goals = useSelector(state => state.goals.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGoals());
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

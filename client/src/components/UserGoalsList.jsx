import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../store/actions/userActions';
import UserGoalCard from './UserGoalCard';

export default function UserGoalsList() {
  const goals = useSelector(state => state.user.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoals());
  }, []);

  function renderList() {
    if (!goals.length) {
      return 'Никаких целей ещё нет';
    }
    console.log(goals);
    return (
      <>
        {goals.map(goal => (
          <UserGoalCard
            key={goal._id}
            title={goal.title}
            description={goal.description}
            createdAt={goal.createdAt}
            term={goal.term}
          />
        ))}
      </>
    );
  }
  return (
    <>
      <div data-testid="list">{renderList()}</div>
    </>
  );
}

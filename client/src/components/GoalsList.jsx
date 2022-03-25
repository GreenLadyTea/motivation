import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../store/actions/userActions';

export default function List() {
  const goals = useSelector(state => state.user.goals);
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
        {goals.map(goal => (
          <div key={goal.title}>{goal.title}</div>
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

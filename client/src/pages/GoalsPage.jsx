import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoals } from '../store/actions/goalActions';

export default function GoalsPage() {
  const goals = useSelector(state => state.goal.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGoals());
  }, []);

  return (
    <div className="container">
      <h1>Цели</h1>
      <div>
        {goals.map(goal => (
          <div key={goal.title}>{goal.title}</div>
        ))}
      </div>
    </div>
  );
}

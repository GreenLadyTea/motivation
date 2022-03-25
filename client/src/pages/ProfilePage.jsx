import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getGoals } from '../store/actions/userActions';

export default function ProfilePage() {
  const goals = useSelector(state => state.user.goals);
  const username = useSelector(state => state.auth.user.login);
  const fio = useSelector(state => state.auth.user.fio);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoals());
  }, []);

  return (
    <div className="container">
      <h1>{username}</h1>
      <div>{fio}</div>
      <div>
        {goals.map(goal => (
          <div key={goal.title}>{goal.title}</div>
        ))}
      </div>
      <Button variant="outline-success" size="sm" as={NavLink} to="/goals/new">
        Поставить новую цель
      </Button>
    </div>
  );
}

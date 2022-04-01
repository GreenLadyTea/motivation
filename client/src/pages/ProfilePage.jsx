import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UserGoalsList from '../components/UserGoalsList';

export default function ProfilePage() {
  const username = useSelector(state => state.auth.user.login);
  const fio = useSelector(state => state.auth.user.fio);

  return (
    <div className="container">
      <h1>{username}</h1>
      <div>{fio}</div>
      <div>
        <UserGoalsList />
      </div>
      <Button variant="outline-success" size="sm" as={NavLink} to="/goals/new">
        Поставить новую цель
      </Button>
    </div>
  );
}

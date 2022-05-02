import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UserGoalsList from '../components/UserGoalsList';
import avatarLogo from '../images/default_avatar.jpg';
import './profile.css';

export default function ProfilePage() {
  const username = useSelector(state => state.auth.user.username);
  const description = useSelector(state => state.profile.description);
  const avatar = avatarLogo;

  return (
    <div className="container">
      <div className="profile-info">
        <img alt="avatar" src={avatar} className="avatar" />
        <div className="user-info">
          <h1>{username}</h1>
          <div>{description}</div>
          <Button variant="outline-success" size="sm">
            Редактировать
          </Button>
        </div>
      </div>
      <h2>
        Мои цели{' '}
        <Button variant="outline-success" size="sm" as={NavLink} to="/goals/new">
          Поставить новую цель
        </Button>
      </h2>

      <div>
        <UserGoalsList />
      </div>
    </div>
  );
}

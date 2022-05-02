import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UserGoalsList from '../components/UserGoalsList';
import avatarLogo from '../images/default_avatar.jpg';
import './profile.css';
import { getUser } from '../store/actions/profileActions';

export default function ProfilePage() {
  const username = useSelector(state => state.profile.username);
  const description = useSelector(state => state.profile.description);
  const avatar = avatarLogo;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="container">
      <div className="profile-info">
        <img alt="avatar" src={avatar} className="avatar" />
        <div className="user-info">
          <h1>{username}</h1>
          <div>{description}</div>
          <Button variant="outline-success" size="sm" as={NavLink} to="/profile/update">
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

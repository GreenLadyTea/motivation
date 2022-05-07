import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Tab, Tabs } from 'react-bootstrap';
import ProfileGoalsList from '../components/ProfileGoalsList';
import avatarLogo from '../images/default_avatar.jpg';
import './profile.css';
import { getUser } from '../store/actions/profileActions';
import ProfileTrackedGoalsList from '../components/ProfileTrackedGoalsList';

export default function ProfilePage() {
  const username = useSelector(state => state.profile.username);
  const name = useSelector(state => state.auth.user.username);
  const description = useSelector(state => state.profile.description);
  const avatar = avatarLogo;
  const dispatch = useDispatch();

  const [key, setKey] = useState('Мои');

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

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
        className="col-md-8 mb-3"
      >
        <Tab eventKey="Мои" title="Мои">
          <ProfileGoalsList />
        </Tab>
        <Tab eventKey="Отслеживаемые" title="Отслеживаемые">
          <ProfileTrackedGoalsList username={name} />
        </Tab>
      </Tabs>
    </div>
  );
}

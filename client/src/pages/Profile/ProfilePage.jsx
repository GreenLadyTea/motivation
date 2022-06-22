import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Tab, Tabs } from 'react-bootstrap';
import avatarLogo from '../../images/default_avatar.jpg';
import './profile.css';
import { getUser } from '../../store/actions/profileActions';
import ProfileTrackedGoalsList from '../../components/ProfileTrackedGoalsList';
import Pencil from '../../components/Misc/Pencil';
import ProfileSucceedGoalsList from '../../components/ProfileSucceedGoalsList';
import ProfileFailedGoalsList from '../../components/ProfileFailedGoalsList';
import ProfileNewGoalsList from '../../components/ProfileNewGoalsList';
import { SERVER_URL } from '../../config/config';

export default function ProfilePage() {
  const username = useSelector(state => state.profile.username);
  const name = useSelector(state => state.auth.user.username);
  const description = useSelector(state => state.profile.description);
  const avatar = useSelector(state => state.profile.avatar);
  const defaultAvatar = avatarLogo;
  const dispatch = useDispatch();

  const [key, setKey] = useState('Новые');

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="container-fluid">
      <div className="profile-info align-items-md-start">
        <div className="avatar-field">
          <img
            alt="avatar"
            src={avatar !== '' ? `${SERVER_URL}/static/${avatar}.jpg` : defaultAvatar}
            className="avatar"
          />
        </div>
        <div className="user-info col-lg-8">
          <div className="nickname">
            <h1>{username}</h1>
            <Button
              variant="outline-success"
              className="mx-2"
              size="sm"
              as={NavLink}
              to="/profile/update"
            >
              <Pencil />
            </Button>
          </div>
          <div>
            {[...description].map(function (elem, index) {
              if (elem === '\n') {
                return <br key={index} />;
              }
              return elem;
            })}
          </div>
        </div>
      </div>
      <h2 className="mt-4">
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
        <Tab eventKey="Новые" title="Новые">
          <ProfileNewGoalsList />
        </Tab>
        <Tab eventKey="Выполненные" title="Выполненные">
          <ProfileSucceedGoalsList />
        </Tab>
        <Tab eventKey="Невыполненные" title="Невыполненные">
          <ProfileFailedGoalsList />
        </Tab>
        <Tab eventKey="Отслеживаемые" title="Отслеживаемые">
          <ProfileTrackedGoalsList username={name} />
        </Tab>
      </Tabs>
    </div>
  );
}

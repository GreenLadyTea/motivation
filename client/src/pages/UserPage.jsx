import React, { useEffect, useState } from 'react';
import avatarLogo from '../images/default_avatar.jpg';
import './Profile/profile.css';
import { useParams } from 'react-router-dom';
import { getUser } from '../store/actions/otherProfileActions';
import { useDispatch, useSelector } from 'react-redux';
import UserNewGoalsList from '../components/UserNewGoalsList';
import { SERVER_URL } from '../config/config';
import { Tab, Tabs } from 'react-bootstrap';
import UserSucceedGoalsList from '../components/UserSucceedGoalsList';
import UserFailedGoalsList from '../components/UserFailedGoalsList';

export default function UserPage() {
  const { username } = useParams();
  const avatar = useSelector(state => state.otherProfile.avatar);
  const description = useSelector(state => state.otherProfile.description);
  const dispatch = useDispatch();
  const defaultAvatar = avatarLogo;

  const [key, setKey] = useState('Новые');

  useEffect(() => {
    dispatch(getUser(username));
  }, []);

  return (
    <div className="container">
      <div className="profile-info align-items-md-start">
        <div className="avatar-field">
          <img
            alt="avatar"
            src={avatar !== '' ? `${SERVER_URL}/static/${avatar}.jpg` : defaultAvatar}
            className="avatar"
          />
        </div>
        <div className="user-info">
          <h1>{username}</h1>
          <div>{description}</div>
        </div>
      </div>
      <h2>Цели пользователя</h2>
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={k => setKey(k)}
          className="col-md-8 mb-3"
        >
          <Tab eventKey="Новые" title="Новые">
            <UserNewGoalsList username={username} />
          </Tab>
          <Tab eventKey="Выполненные" title="Выполненные">
            <UserSucceedGoalsList username={username} />
          </Tab>
          <Tab eventKey="Невыполненные" title="Невыполненные">
            <UserFailedGoalsList username={username} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

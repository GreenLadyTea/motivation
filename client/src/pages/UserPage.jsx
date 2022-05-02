import React, { useEffect } from 'react';
import avatarLogo from '../images/default_avatar.jpg';
import './profile.css';
import { useParams } from 'react-router-dom';
import { getDescription } from '../store/actions/otherProfileActions';
import { useDispatch, useSelector } from 'react-redux';

export default function UserPage() {
  const { username } = useParams();
  const description = useSelector(state => state.otherProfile.description);
  const dispatch = useDispatch();
  const avatar = avatarLogo;

  useEffect(() => {
    dispatch(getDescription(username));
  }, []);

  return (
    <div className="container">
      <div className="profile-info">
        <img alt="avatar" src={avatar} className="avatar" />
        <div className="user-info">
          <h1>{username}</h1>
          <div>{description}</div>
        </div>
      </div>
      <h2>Цели пользователя</h2>
    </div>
  );
}

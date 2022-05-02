import React from 'react';
import avatarLogo from '../images/default_avatar.jpg';
import './profile.css';

export default function UserPage() {
  const username = '';
  const description = 'Описание';
  const avatar = avatarLogo;

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

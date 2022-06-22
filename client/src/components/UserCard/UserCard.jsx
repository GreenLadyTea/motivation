import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import avatarLogo from '../../images/default_avatar.jpg';
import './usercard.css';
import { SERVER_URL } from '../../config/config';

export default function UserCard({ username, avatar }) {
  const nick = useSelector(state => state.profile.username);
  const defaultAvatar = avatarLogo;

  return (
    <>
      <Card>
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <img
              alt="avatar"
              src={avatar !== '' ? `${SERVER_URL}/static/${avatar}.jpg` : defaultAvatar}
              className="avatar_small"
            />
            {username === nick ? (
              <Link to={`/profile`}>{username}</Link>
            ) : (
              <Link to={`/people/${username}`}>{username}</Link>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
}

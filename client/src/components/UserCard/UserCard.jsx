import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import avatarLogo from '../../images/default_avatar.jpg';
import './usercard.css';

export default function UserCard({ username }) {
  const nick = useSelector(state => state.profile.username);
  const avatar = avatarLogo;

  return (
    <>
      <Card>
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <img alt="avatar" src={avatar} className="avatar_small" />
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

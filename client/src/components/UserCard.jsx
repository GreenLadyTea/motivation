import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserCard({ username }) {
  const nick = useSelector(state => state.profile.username);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            {username === nick ? (
              <Link to={`/profile`}>{username}</Link>
            ) : (
              <Link to={`/people/${username}`}>{username}</Link>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

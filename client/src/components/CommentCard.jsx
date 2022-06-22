import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setDate } from '../handlers/DateHandler';
import { useSelector } from 'react-redux';

export default function CommentCard({ username, text, createdAt }) {
  const nick = useSelector(state => state.profile.username);
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {username === nick ? (
              <Link to={`/profile`}>{username}</Link>
            ) : (
              <Link to={`/people/${username}`}>{username}</Link>
            )}
          </Card.Title>
          <Card.Text>
            {text}
            <br />
            <div className="text-muted">{setDate(createdAt)}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

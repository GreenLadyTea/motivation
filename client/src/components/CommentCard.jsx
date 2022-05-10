import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CommentCard({ username, text, createdAt }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={`/people/${username}`}>{username}</Link>
          </Card.Title>
          <Card.Text>
            {text}
            <br />
            {createdAt}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

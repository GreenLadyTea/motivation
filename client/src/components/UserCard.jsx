import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserCard({ username }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            <Link to={`/people/${username}`}>{username}</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

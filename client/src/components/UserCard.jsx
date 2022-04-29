import React from 'react';
import { Card } from 'react-bootstrap';

export default function UserCard({ username }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>{username}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

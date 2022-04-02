import React from 'react';
import { Card } from 'react-bootstrap';

export default function UserCard({ login, fio }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{login}</Card.Title>
          <Card.Text>{fio}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

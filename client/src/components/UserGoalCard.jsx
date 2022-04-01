import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function UserGoalCard({ title, term, description, createdAt }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {createdAt} до {term}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary">Выполнить</Button>
        </Card.Body>
      </Card>
    </>
  );
}

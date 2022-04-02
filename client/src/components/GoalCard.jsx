import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';

export default function GoalCard({ title, term, description, createdAt, status }) {
  const fixedTerm = createdAt.slice(0, 10);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2">
            <Stack gap={2} direction="horizontal">
              <div className="text-muted">{fixedTerm}</div>
              <div className="text-danger ms-auto">до {term}</div>
            </Stack>
          </Card.Subtitle>
          <Card.Text>
            {description}
            <br />
            {status}
          </Card.Text>
          <Button variant="primary">Мотивировать</Button>
        </Card.Body>
      </Card>
    </>
  );
}

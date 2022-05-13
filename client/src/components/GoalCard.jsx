import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { trackGoal } from '../store/actions/goalsActions';
import { Link } from 'react-router-dom';
import { setDate } from '../handlers/DateHandler';

export default function GoalCard({ id, title, username, term, description, createdAt }) {
  async function handleClick() {
    const response = await trackGoal(id);
    console.log(response.status);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={`/goals/${id}`}>{title}</Link>
          </Card.Title>
          <Card.Subtitle className="mb-2">
            <Stack gap={2} direction="horizontal">
              <div className="text-muted">{setDate(createdAt)}</div>
              <div className="text-danger ms-auto">до {setDate(term)}</div>
            </Stack>
          </Card.Subtitle>
          <Card.Text>
            {description}
            <br />
            {username ? <Link to={`/people/${username}`}>{username}</Link> : ''}
          </Card.Text>
          <Button variant="primary" onClick={handleClick}>
            Мотивировать
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

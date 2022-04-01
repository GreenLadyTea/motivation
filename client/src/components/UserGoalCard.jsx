import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { doGoal } from '../store/actions/userGoalsActions';
import { useDispatch } from 'react-redux';

export default function UserGoalCard({ id, title, term, description, createdAt, status }) {
  const dispatch = useDispatch();
  async function handleClick() {
    const response = await dispatch(doGoal(id));
    console.log(response.status);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {createdAt} до {term}
            {status}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" onClick={handleClick}>
            Выполнить
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

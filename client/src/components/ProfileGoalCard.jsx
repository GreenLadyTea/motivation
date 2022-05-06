import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { doGoal } from '../store/actions/profileActions';
import { useDispatch } from 'react-redux';

export default function ProfileGoalCard({ id, title, term, description, createdAt, status }) {
  const dispatch = useDispatch();
  async function handleClick() {
    const response = await dispatch(doGoal(id));
    console.log(response.status);
  }

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
          <Button variant="primary" onClick={handleClick}>
            Выполнить
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

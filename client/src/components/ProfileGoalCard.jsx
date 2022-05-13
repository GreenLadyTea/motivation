import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { doGoal } from '../store/actions/profileActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDate } from '../handlers/DateHandler';
import Pencil from './Misc/Pencil';
import Trashcan from './Misc/Trashcan';

export default function ProfileGoalCard({ id, title, term, description, createdAt, status }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleExecute() {
    const response = await dispatch(doGoal(id));
    console.log(response.status);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <Stack gap={3} direction="horizontal">
              <div>{title}</div>
              <Button
                onClick={() => navigate(`/goals/update/${id}`)}
                className="ms-auto"
                size="sm"
                variant="outline-secondary"
              >
                <Pencil />
              </Button>
              <Button size="sm" variant="outline-danger">
                <Trashcan />
              </Button>
            </Stack>
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
            {status}
          </Card.Text>
          <Button variant="primary" onClick={handleExecute}>
            Выполнить
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

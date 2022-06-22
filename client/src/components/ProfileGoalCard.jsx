import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { deleteGoal, doGoal } from '../store/actions/profileActions';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { countDifferenceInDays, setDate } from '../handlers/DateHandler';
import Pencil from './Misc/Pencil';
import Trashcan from './Misc/Trashcan';

export default function ProfileGoalCard({ id, title, term, description, createdAt, status }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleExecute() {
    const response = await dispatch(doGoal(id));
    console.log(response.status);
  }

  async function handleDelete() {
    console.log(id);
    const response = await dispatch(deleteGoal(id));
    console.log(response.status);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <Stack gap={3} direction="horizontal">
              <Link to={`/goals/${id}`}>{title}</Link>
              {status === 'new' && (
                <>
                  <Button
                    onClick={() => navigate(`/goals/update/${id}`)}
                    className="ms-auto"
                    size="sm"
                    variant="outline-secondary"
                  >
                    <Pencil />
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={handleDelete}>
                    <Trashcan />
                  </Button>
                </>
              )}
            </Stack>
          </Card.Title>
          <Card.Subtitle className="mb-2">
            {status === 'new' && countDifferenceInDays(term) && (
              <div className="text-danger">Время скоро истечёт!</div>
            )}
            <Stack gap={2} direction="horizontal">
              <div className="text-muted">{setDate(createdAt)}</div>
              <div className="text-danger ms-auto">до {setDate(term)}</div>
            </Stack>
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          {status === 'approved' && <div className="text-success">Выполнение подтверждено</div>}
          {status === 'done' && <div className="text-muted">Выполнена, ожидает подтверждения</div>}
          {status === 'new' && (
            <Button variant="primary" onClick={handleExecute}>
              Выполнить
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

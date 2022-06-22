import React from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { countDifferenceInDays, setDate } from '../handlers/DateHandler';
import { approveGoal } from '../store/actions/goalsActions';

export default function TrackedGoalCard({
  id,
  title,
  status,
  username,
  term,
  description,
  createdAt
}) {
  const navigate = useNavigate();

  function getStatus(stat) {
    if (stat === 'new') {
      return <div className="text-muted">Ещё не выполнена</div>;
    }
    if (stat === 'done') {
      return <div className="text-success">Выполнена, ожидает подтверждения</div>;
    }
    if (stat === 'approved') {
      return <div className="text-success">Подтверждено выполнение</div>;
    }
    if (stat === 'failed') {
      return <div className="text-danger">Провалена!</div>;
    }
  }

  async function handleClick() {
    const response = await approveGoal(id);
    if (response.status === 200) {
      navigate(`/goals/${id}`);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={`/goals/${id}`}>{title}</Link>
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
          <Card.Text>
            {description}
            {getStatus(status)}
            <br />
            {username ? <Link to={`/people/${username}`}>{username}</Link> : ''}
          </Card.Text>
          {status === 'done' && (
            <Button variant="primary" onClick={handleClick}>
              Подтвердить выполнение
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

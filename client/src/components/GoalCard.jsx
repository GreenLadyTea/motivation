import React, { useEffect } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { trackGoal } from '../store/actions/goalsActions';
import { Link, useNavigate } from 'react-router-dom';
import { setDate } from '../handlers/DateHandler';
import { useDispatch, useSelector } from 'react-redux';
import { getTrackedGoals } from '../store/actions/profileActions';

export default function GoalCard({ id, title, status, username, term, description, createdAt }) {
  const trackedGoals = useSelector(state => state.profile.trackedGoals);
  const name = useSelector(state => state.auth.user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrackedGoals(name));
  }, []);

  async function handleClick() {
    const response = await trackGoal(id);
    if (response.status === 200) {
      navigate(`/goals/${id}`);
    }
  }

  function isNotTracked(goals, number) {
    for (let i = 0; i < goals.length; i++) {
      if (goals[i]._id === number) {
        return false;
      }
    }
    return true;
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
          {status === 'new' && isNotTracked(trackedGoals, id) && (
            <Button variant="primary" onClick={handleClick}>
              Мотивировать
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

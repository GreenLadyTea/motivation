import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoal, postComment } from '../store/actions/goalPageActions';
import { Container, Row, Col, Card, Form, Button, Stack } from 'react-bootstrap';
import CommentsList from '../components/CommentsList';
import { setDate } from '../handlers/DateHandler';

export default function GoalPage() {
  const goal = useSelector(state => state.goalPage.goal);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(getGoal(id));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await postComment(id, comment);
    if (response.status === 201) {
      setComment('');
    }
  }

  function getStatus(stat) {
    if (stat === 'new') {
      return <div className="text-muted">Ещё не выполнена</div>;
    }
    if (stat === 'done') {
      return <div className="text-success">Выполнена, ожидает подтверждения</div>;
    }
    if (stat === 'approved') {
      return <div>Подтверждено выполнение</div>;
    }
    if (stat === 'failed') {
      return <div className="text-danger">Провалена!</div>;
    }
  }

  return (
    <Container>
      <Stack gap={3} className="col-md-8">
        <h1>{goal.title}</h1>
        <div>
          Автор: <Link to={`/people/${goal.username}`}>{goal.username}</Link>
        </div>
        <div>{getStatus(goal.status)}</div>
        <Row className="col-md-8">
          <Col className="text-muted" md={4}>
            {setDate(goal.createdAt)}
          </Col>
          <Col className="text-danger" md={{ span: 4, offset: 4 }}>
            до {setDate(goal.term)}
          </Col>
        </Row>
        <Card className="col-md-8">
          <Card.Body>
            <Card.Text>{goal.description}</Card.Text>
          </Card.Body>
        </Card>
        <Form className="col-md-8" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <h3>Мой комментарий</h3>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              placeholder="Оставьте свой комментарий!"
              onChange={e => setComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Оставить комментарий
          </Button>
        </Form>
        <CommentsList id={id} />
      </Stack>
    </Container>
  );
}

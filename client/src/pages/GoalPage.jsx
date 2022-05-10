import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoal, postComment } from '../store/actions/goalPageActions';
import { Container, Row, Col, Card, Form, Button, Stack } from 'react-bootstrap';
import CommentsList from '../components/CommentsList';

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

  return (
    <Container>
      <Stack gap={3} className="col-md-8">
        <h1>{goal.title}</h1>
        <div>
          Автор: <Link to={`/people/${goal.username}`}>{goal.username}</Link>
        </div>
        <Row className="col-md-8">
          <Col md={4}>{goal.term}</Col>
          <Col md={{ span: 4, offset: 4 }}>{goal.createdAt}</Col>
        </Row>
        <Card>
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
              placeholder="Мотивируйте автора или поделитесь полезной информацией!"
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

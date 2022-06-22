import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { update } from '../store/actions/goalsActions';

export default function UpdateGoalPage() {
  const { id } = useParams();
  const goals = useSelector(state => state.profile.goals);
  const goal = goals.find(goal => goal._id === id);

  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [term, setTerm] = useState(goal.term.slice(0, 16));

  const [show, setShow] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await update(id, title, description, term);
    if (response.status === 200) {
      setTitle('');
      setDescription('');
      setTerm('');
      setMessage('Вперёд к своей цели!');
      setShow('success');
      setTimeout(() => navigate('/profile'), 1000);
    } else {
      setMessage(response.message);
      setShow('danger');
    }
  }

  return (
    <div className="container">
      <h1>Отредактируйте цель</h1>

      {show === 'danger' && (
        <Alert variant={show}>
          <Alert.Heading>Ошибка!</Alert.Heading>
          <p>{message}</p>
        </Alert>
      )}

      {show === 'success' && (
        <Alert variant={show}>
          <Alert.Heading>Успех</Alert.Heading>
          <p>{message}</p>
        </Alert>
      )}

      <Form className="col-md-6" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Цель</Form.Label>
          <Form.Control
            type="text"
            placeholder="Сформулируйте свою цель"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Срок выполнения</Form.Label>
          <Form.Control
            type="datetime-local"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            placeholder="Подробнее раскройте суть своего плана"
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Поставить новую цель
        </Button>
      </Form>
    </div>
  );
}

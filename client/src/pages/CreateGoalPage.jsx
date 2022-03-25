import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { create } from '../store/actions/goalAction';
import { useNavigate } from 'react-router-dom';

export default function CreateGoalPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [term, setTerm] = useState('');
  const [show, setShow] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await create(title, description, term);
    console.log(response);
    if (response.status === 201) {
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
      <h1>Новая цель</h1>

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

      <Form onSubmit={handleSubmit}>
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

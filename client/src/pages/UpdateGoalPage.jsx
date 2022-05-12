import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

export default function UpdateGoalPage() {
  //const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [term, setTerm] = useState('');
  const [show, setShow] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setShow('success');
  }

  return (
    <div className="container">
      <h1>Отредактируйте цель</h1>

      {show === 'danger' && (
        <Alert variant={show}>
          <Alert.Heading>Ошибка!</Alert.Heading>
          <p>1</p>
        </Alert>
      )}

      {show === 'success' && (
        <Alert variant={show}>
          <Alert.Heading>Успех</Alert.Heading>
          <p>2</p>
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

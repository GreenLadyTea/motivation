import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function CreateGoalPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [term, setTerm] = useState('');

  return (
    <div className="container">
      <h1>Новая цель</h1>
      <Form>
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

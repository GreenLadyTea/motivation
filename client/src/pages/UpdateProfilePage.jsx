import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateDescription } from '../store/actions/profileActions';
import { useSelector } from 'react-redux';

export default function UpdateProfilePage() {
  const text = useSelector(state => state.profile.description);
  const [description, setDescription] = useState(text);
  const [show, setShow] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await updateDescription(description);
    if (response.status === 200) {
      setDescription('');
      setMessage('Профиль успешно обновлен!');
      setShow('success');
      setTimeout(() => navigate('/'), 1000);
    } else {
      setMessage(response.message);
      setShow('danger');
    }
  }

  return (
    <div className="container">
      <h1>Редактирование описания профиля</h1>

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
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            placeholder="Расскажите о себе"
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Обновить описание
        </Button>
      </Form>
    </div>
  );
}

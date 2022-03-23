import { Button, Form, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { signUp } from '../store/actions/authAction';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const [message, setMessage] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState('normal');

  async function handleClick(e) {
    e.preventDefault();
    const fio = lastname + ' ' + firstname + ' ' + patronymic;
    if (password !== repeatedPassword) {
      setMessage('Пароли не совпадают');
      setShow('danger');
      return;
    }
    const response = await signUp(login, password, fio);
    if (response.status === 201) {
      setShow('success');
      setMessage(response.message);
      setPassword('');
      setLogin('');
      setFirstname('');
      setLastname('');
      setPatronymic('');
      setRepeatedPassword('');
      setTimeout(() => navigate('/'), 1000);
    } else {
      setMessage(response.message);
      setShow('danger');
    }
  }

  return (
    <div className="container">
      <h1>Регистрация</h1>
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

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите логин"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите фамилию"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Отчество</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите логин"
            value={patronymic}
            onChange={e => setPatronymic(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Повторите пароль"
            value={repeatedPassword}
            onChange={e => setRepeatedPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={e => handleClick(e)}>
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
}

import { Button, Form, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { signUp } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const [message, setMessage] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState('normal');
  const usernamePattern = /^\w{3,20}$/;

  function validateForm() {
    let outcome = true;
    let message = '';
    if (!usernamePattern.test(username)) {
      message += 'Ник содержит только английские буквы, цифры и подчеркивание';
      setShow('danger');
      outcome = false;
    }
    if (password !== repeatedPassword) {
      message += ' Введенные пароли не совпадают';
      setShow('danger');
      outcome = false;
    }
    setMessage(message);
    return outcome;
  }

  async function handleClick(e) {
    e.preventDefault();
    if (validateForm()) {
      const response = await signUp(login, password, username);
      if (response.status === 201) {
        setShow('success');
        setMessage(response.message);
        setPassword('');
        setLogin('');
        setUsername('');
        setRepeatedPassword('');
        setTimeout(() => navigate('/authorization'), 1000);
      } else {
        setMessage(response.message);
        setShow('danger');
      }
    }
  }

  return (
    <div className="container">
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

      <Form className="col-md-6">
        <h1>Регистрация</h1>
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
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите фамилию"
            value={username}
            onChange={e => setUsername(e.target.value)}
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

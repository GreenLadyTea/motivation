import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/actions/authAction';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const fio = lastname + ' ' + firstname + ' ' + patronymic;
    dispatch(signUp(login, password, fio));
    navigate('/');
  }

  return (
    <div className="container">
      <h1>Регистрация</h1>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
}

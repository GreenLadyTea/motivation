import { Button, Form } from 'react-bootstrap';
import React from 'react';

export default function RegistrationPage() {
  return (
    <div className="container">
      <h1>Регистрация</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Логин</Form.Label>
          <Form.Control type="text" placeholder="Введите логин" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
}

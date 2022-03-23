import { NavLink, Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import React from 'react';

export default function AuthLayout() {
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Кнут и Пряник</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">
                  Авторизация
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registration">
                  Регистрация
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

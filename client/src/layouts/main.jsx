import { NavLink, Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import React from 'react';

export default function MainLayout() {
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Кнут и Пряник</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <NavLink to="/">Главная</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/goals">Цели</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/people">Люди</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/profile">Профиль</NavLink>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer>2022</footer>
    </>
  );
}

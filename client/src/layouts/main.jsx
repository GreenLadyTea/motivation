import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/authActions';
import Logo from '../images/logo.svg';

export default function MainLayout() {
  const username = useSelector(state => state.auth.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick() {
    dispatch(logout());
    navigate('/');
  }
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>
              <img
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="logo"
              />
              Кнут и Пряник
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link as={NavLink} to="/goals">
                  Цели
                </Nav.Link>
                <Nav.Link as={NavLink} to="/people">
                  Люди
                </Nav.Link>
                <Nav.Link as={NavLink} to="/">
                  {username}
                </Nav.Link>
                <Button variant="outline-primary" onClick={handleClick}>
                  Выйти
                </Button>
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

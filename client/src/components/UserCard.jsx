import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function UserCard({ username }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            <Nav.Link as={NavLink} to={`/people/${username}`}>
              {username}
            </Nav.Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

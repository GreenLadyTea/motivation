import React from 'react';
import UsersList from '../components/UsersList';

export default function PeoplePage() {
  return (
    <div className="container">
      <h1>Люди</h1>
      <UsersList />
    </div>
  );
}

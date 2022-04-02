import React from 'react';
import AllGoalsList from '../components/AllGoalsList';

export default function GoalsPage() {
  return (
    <div className="container">
      <h1>Цели</h1>
      <div>
        <AllGoalsList />
      </div>
    </div>
  );
}

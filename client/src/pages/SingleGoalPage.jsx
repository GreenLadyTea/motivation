import React from 'react';
import { useParams } from 'react-router-dom';

export default function SingleGoalPage() {
  const { title } = useParams();
  return (
    <div className="container">
      <h1>{title}</h1>
    </div>
  );
}

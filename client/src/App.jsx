import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useRoutes from './routes';

export default function App() {
  const routes = useRoutes(false);
  return (
    <>
      <div className="container">{routes}</div>
    </>
  );
}

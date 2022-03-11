import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useRoutes from './routes';
import { useSelector } from 'react-redux';

export default function App() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const routes = useRoutes(isAuth);
  return (
    <>
      <div className="container">{routes}</div>
    </>
  );
}

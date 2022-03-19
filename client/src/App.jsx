import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useRoutes from './routes';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const routes = useRoutes(isAuth);
  return (
    <>
      <BrowserRouter>
        <div className="container">{routes}</div>
      </BrowserRouter>
    </>
  );
}

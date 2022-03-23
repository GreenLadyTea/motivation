import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useRoutes from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { checkAuth } from './store/actions/authAction';

export default function App() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const routes = useRoutes(isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
      if (!isAuth) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="container">{routes}</div>
      </BrowserRouter>
    </>
  );
}

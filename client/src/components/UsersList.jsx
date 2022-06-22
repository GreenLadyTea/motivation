import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Stack } from 'react-bootstrap';
import { getAllUsers } from '../store/actions/usersActions';
import UserCard from './UserCard/UserCard';

export default function UsersList() {
  const [searchText, setSearchText] = useState('');
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <div className="mb-3 col-lg-8">
        <Form.Control
          type="text"
          placeholder="Найти человека"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          required
        />
      </div>
      <Stack gap={3} className="col-lg-8">
        {users
          .filter(user => user.username.indexOf(searchText) !== -1)
          .map(user => (
            <UserCard key={user._id} username={user.username} avatar={user.avatar} />
          ))}
      </Stack>
    </>
  );
}

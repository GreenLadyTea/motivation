import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';
import { getAllUsers } from '../store/actions/usersActions';
import UserCard from './UserCard';

export default function UsersList() {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <Stack gap={3} className="col-md-6">
        {users.map(user => (
          <UserCard key={user._id} login={user.login} fio={user.fio} />
        ))}
      </Stack>
    </>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { getSubscribers } from '../store/actions/goalPageActions';
import UserCard from './UserCard/UserCard';

export default function SubscribersList({ id }) {
  const subscribers = useSelector(state => state.goalPage.subscribers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribers(id));
  }, [subscribers]);

  function renderList() {
    if (!subscribers.length) {
      return 'Подписчиков пока нет';
    }
    return (
      <>
        <Stack gap={3} className="col-md-8">
          {subscribers.map(subscriber => (
            <UserCard
              key={subscriber._id}
              username={subscriber.username}
              avatar={subscriber.avatar}
            />
          ))}
        </Stack>
      </>
    );
  }
  return (
    <>
      <div>{renderList()}</div>
    </>
  );
}

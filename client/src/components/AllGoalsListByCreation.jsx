import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getAllGoalsSortedByCreation, REQUEST_STATUS } from '../store/actions/goalsActions';
import { Form, Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';
import Loader from './Misc/Loader';

export default function AllGoalsListByCreation() {
  const goals = useSelector(state => state.goals.goalsByCreation);
  const userId = useSelector(state => state.auth.user.id);
  const reqStatus = useSelector(state => state.goals.requestStatus);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getAllGoalsSortedByCreation(userId));
  }, []);

  function renderList() {
    if (!goals.length) {
      return 'Никаких целей ещё нет';
    }
    return (
      <>
        {reqStatus === REQUEST_STATUS.LOADING && (
          <>
            <Loader />
          </>
        )}
        {reqStatus === REQUEST_STATUS.SUCCESS && (
          <>
            <div className="mb-3 col-lg-8">
              <Form.Control
                type="text"
                placeholder="Найти цель"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                required
              />
            </div>
            <Stack gap={3} className="col-md-8">
              {goals
                .filter(goal => goal.title.indexOf(searchText) !== -1)
                .map(goal => (
                  <GoalCard
                    key={goal._id}
                    id={goal._id}
                    title={goal.title}
                    status={goal.status}
                    username={goal.username}
                    description={goal.description}
                    createdAt={goal.createdAt}
                    term={goal.term}
                  />
                ))}
            </Stack>
          </>
        )}
      </>
    );
  }
  return (
    <>
      <div>{renderList()}</div>
    </>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getAllGoalsSortedByTerm, REQUEST_STATUS } from '../store/actions/goalsActions';
import { Form, Stack } from 'react-bootstrap';
import GoalCard from './GoalCard';
import Loader from './Misc/Loader';

export default function AllGoalsListByTerm() {
  const goals = useSelector(state => state.goals.goalsByTerm);
  const userId = useSelector(state => state.auth.user.id);
  const reqStatus = useSelector(state => state.goals.requestStatus);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getAllGoalsSortedByTerm(userId));
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
                    status={goal.status}
                    title={goal.title}
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

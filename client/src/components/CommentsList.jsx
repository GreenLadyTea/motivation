import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { getComments } from '../store/actions/goalPageActions';
import CommentCard from './CommentCard';

export default function CommentsList({ id }) {
  const comments = useSelector(state => state.goalPage.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(id));
  }, [comments]);

  function renderList() {
    if (!comments.length) {
      return 'Комментариев пока нет';
    }
    return (
      <>
        <Stack gap={3} className="col-md-8">
          {comments.map(comment => (
            <CommentCard
              key={comment.id}
              username={comment.username}
              text={comment.text}
              createdAt={comment.createdAt}
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

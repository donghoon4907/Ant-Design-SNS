import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST
} from "../../reducers/post";
import PostPresentation from "./PostPresentation";

const PostContainer = ({ post }) => {
  console.log(post);
  const dispatch = useDispatch();
  const commentRef = useRef(null);
  const [commentCount, setCommentCount] = useState(post.Comments.length);
  const [currentCommentArr, setCurrentCommentArr] = useState([]);
  const { loadUserData } = useSelector(state => state.user);
  const { isAddComment } = useSelector(state => state.post);
  const [isLike, setIsLike] = useState(false);

  const onLike = useCallback(() => {
    // 로그인한 유저가 해당 포스트를 좋아요한 경우
    if (post.Likers && post.Likers.find(v => v.id === loadUserData.id)) {
      setIsLike(false);
      dispatch({
        type: UNLIKE_POST_REQUEST,
        payload: post.id
      });
    } else {
      setIsLike(true);
      dispatch({
        type: LIKE_POST_REQUEST,
        payload: post.id
      });
    }
  }, [isLike]);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: ADD_COMMENT_REQUEST,
        payload: {
          postId: post.id,
          content: commentRef.current.value
        }
      });
      setCurrentCommentArr([...currentCommentArr, commentRef.current.value]);
      setCommentCount(commentCount + 1);
      commentRef.current.value = "";
    },
    [commentCount, commentRef.current]
  );
  const mapToDescription = useCallback(
    content =>
      content.map(val => {
        if (val.match(/#[^\s]+/)) {
          return (
            <Link
              href={{
                pathname: "/hashtag",
                query: { tag: val.slice(1).toLowerCase() }
              }}
              as={`/hashtag/${val.slice(1)}`}
              key={val}
            >
              <a>{val}</a>
            </Link>
          );
        }
        return val;
      }),
    []
  );

  const mapToComment = useCallback(
    post =>
      post.Comments.map(comment => (
        <div key={`comment${comment.id}`}>
          <span>{`${comment.User.userId} : ${comment.content}`}</span>
          <div style={{ float: "right" }}>
            {comment.createdAt.replace("T", " ").substring(0, 19)}
          </div>
        </div>
      )),
    []
  );

  const mapToAddComment = useCallback(
    () =>
      currentCommentArr.map(comment => (
        <div key={comment}>
          <span>{`${loadUserData.userId} : ${comment}`}</span>
          <div style={{ float: "right" }}>방금 전</div>
        </div>
      )),
    [currentCommentArr]
  );
  useEffect(() => {
    if (
      post.Likers &&
      post.Likers.find(liker => liker.id === loadUserData.id)
    ) {
      setIsLike(true);
    }
  });
  return (
    <PostPresentation
      post={post}
      loadUserData={loadUserData}
      commentCount={commentCount}
      isAddComment={isAddComment}
      isLike={isLike}
      commentRef={commentRef}
      mapToDescription={mapToDescription}
      mapToComment={mapToComment}
      mapToAddComment={mapToAddComment}
      onLike={onLike}
      onSubmit={onSubmit}
      loggedInUser={loadUserData.userId}
    />
  );
};

export default PostContainer;

PostContainer.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    User: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    }),
    Comments: PropTypes.array.isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
      .isRequired,
    Likers: PropTypes.array
  })
};

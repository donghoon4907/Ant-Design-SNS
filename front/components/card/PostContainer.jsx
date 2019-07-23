import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../reducers/post";
import PostPresentation from "./PostPresentation";

const PostContainer = ({ post }) => {
  const dispatch = useDispatch();
  const commentRef = useRef(null);
  const [commentCount, setCommentCount] = useState(post.Comments.length);
  const [currentCommentArr, setCurrentCommentArr] = useState([]);
  const { loadUserData } = useSelector(state => state.user);
  const { isAddComment } = useSelector(state => state.post);

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

  const mapToImages = useCallback(
    () =>
      post.Images.length !== 0 &&
      post.Images.map((image, idx) => (
        <img
          key={`postImage${idx + 1}`}
          src={`http://localhost:3001/${image.src}`}
          alt="load error"
          style={{
            width: "100%",
            height: "500px",
            marginTop: "5px"
          }}
        />
      )),
    []
  );
  return (
    <PostPresentation
      post={post}
      loadUserData={loadUserData}
      commentCount={commentCount}
      isAddComment={isAddComment}
      commentRef={commentRef}
      mapToDescription={mapToDescription}
      mapToComment={mapToComment}
      mapToAddComment={mapToAddComment}
      mapToImages={mapToImages}
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
    Images: PropTypes.array.isRequired
  })
};

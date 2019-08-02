import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST
} from "../../reducers/post";
import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST
} from "../../reducers/user";
import PostPresentation from "./PostPresentation";

const PostContainer = ({ post, used }) => {
  const dispatch = useDispatch();
  const commentRef = useRef(null);
  const [commentCount, setCommentCount] = useState(
    post && post.Comments.length
  );
  const [currentCommentArr, setCurrentCommentArr] = useState([]);
  const [likeCount, setLikeCount] = useState(post && post.Likers.length);
  const { loadUserData } = useSelector(state => state.user);
  const { isAddComment } = useSelector(state => state.post);
  const [isLike, setIsLike] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const onFollow = useCallback(
    userId => () => {
      setIsFollowing(true);
      dispatch({
        type: FOLLOW_USER_REQUEST,
        payload: userId
      });
    },
    []
  );
  const onUnfollow = useCallback(
    userId => () => {
      setIsFollowing(false);
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        payload: userId
      });
    },
    []
  );
  const onRetweet = useCallback(() => {
    dispatch({
      type: RETWEET_REQUEST,
      payload: post.id
    });
  }, [post.id]);
  const onLike = useCallback(() => {
    // 로그인한 유저가 해당 포스트를 좋아요한 경우
    if (isLike) {
      setIsLike(false);
      setLikeCount(likeCount - 1);
      dispatch({
        type: UNLIKE_POST_REQUEST,
        payload: post.id
      });
    } else {
      setIsLike(true);
      setLikeCount(likeCount + 1);
      dispatch({
        type: LIKE_POST_REQUEST,
        payload: post.id
      });
    }
  }, [isLike, post && post.id]);
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
    if (
      loadUserData &&
      loadUserData.User.Followings.find(v => v.id === post.User.id)
    ) {
      setIsFollowing(true);
    }
  }, [loadUserData && loadUserData]);
  return (
    loadUserData && (
      <PostPresentation
        post={post}
        used={used}
        likeCount={likeCount}
        commentCount={commentCount}
        loadUserData={loadUserData.id}
        isAddComment={isAddComment}
        isLike={isLike}
        isFollowing={isFollowing}
        commentRef={commentRef}
        mapToDescription={mapToDescription}
        mapToComment={mapToComment}
        mapToAddComment={mapToAddComment}
        onLike={onLike}
        onSubmit={onSubmit}
        onRetweet={onRetweet}
        onFollow={onFollow}
        onUnfollow={onUnfollow}
      />
    )
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
  }),
  used: PropTypes.string
};

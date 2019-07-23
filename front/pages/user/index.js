import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_POST_REQUEST } from "../../reducers/post";

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.post);
  useEffect(() => {
    dispatch({
      type: LOAD_USER_POST_REQUEST,
      payload: id
    });
  }, []);
  return (
    userInfo && (
      <div key={userInfo.id}>
        <p>유저명: {userInfo.userId}</p>
        <p>작성한 포스트 수: {userInfo.Posts}</p>
        <p>팔로잉 수: {userInfo.Followings}</p>
        <p>팔로워 수: {userInfo.Followers}</p>
      </div>
    )
  );
};

User.getInitialProps = async ({ query: { id } }) => ({ id });

export default User;

User.propTypes = {
  id: PropTypes.string
};

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "antd";
import { useRouter } from "next/router";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import PostCard from "../../components/card/PostContainer";

const User = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadUserData } = useSelector(state => state.user);
  const { userInfo } = useSelector(state => state.user);
  useEffect(() => {
    if (!loadUserData) {
      router.push("/");
    }
    dispatch({
      type: LOAD_USER_REQUEST,
      payload: id
    });
  }, []);
  return (
    userInfo &&
    loadUserData && (
      <div>
        <div
          style={{
            height: "400px",
            position: "relative",
            borderBottom: "1px dotted lightgray"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "120px"
            }}
          >
            {userInfo.thumbnail === "none" ? (
              <Avatar icon="user" size={260} />
            ) : (
              <img
                src={`http://localhost:3001/${userInfo.thumbnail}`}
                alt="load error"
                style={{
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%"
                }}
              />
            )}
          </div>
          <div
            style={{
              position: "absolute",
              top: "120px",
              left: "500px",
              fontSize: "32px"
            }}
          >
            <div style={{ marginBottom: "30px" }}>
              <div>유저명: {userInfo.userId}</div>
              {loadUserData.id === userInfo.id ? (
                <Button>내 정보 관리</Button>
              ) : (
                <Button>
                  {loadUserData.User.Followings.find(v => v.id === userInfo.id)
                    ? "UNFOLLOW"
                    : "FOLLOW"}
                </Button>
              )}
            </div>

            <div>
              <span>포스트 수: {userInfo.PostsCount}</span>
              <span>&nbsp;/&nbsp;</span>
              <span>팔로잉 수: {userInfo.Followings}</span>
              <span>&nbsp;/&nbsp;</span>
              <span>팔로워 수: {userInfo.Followers}</span>
            </div>
          </div>
        </div>
        <div>
          <h1>{userInfo.userId}님의 최신 포스트</h1>
          <PostCard post={userInfo.Posts} used="USER" />
        </div>
      </div>
    )
  );
};

User.getInitialProps = async ({ query: { id } }) => ({ id });

export default User;

User.propTypes = {
  id: PropTypes.string
};

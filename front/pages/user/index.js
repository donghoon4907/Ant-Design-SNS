import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Button } from "antd";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import PostCard from "../../components/card/PostContainer";
import { Container, Thumbnail, Description } from "./style";

const User = () => {
  const { loadUserData } = useSelector(state => state.user);
  const { userInfo } = useSelector(state => state.user);
  return (
    userInfo &&
    loadUserData && (
      <Container>
        <div>
          <Thumbnail>
            {userInfo.thumbnail === "none" ? (
              <Avatar icon="user" size={260} />
            ) : (
              <img
                src={`http://localhost:3001/${userInfo.thumbnail}`}
                alt="load error"
              />
            )}
          </Thumbnail>
          <Description>
            <div>
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
          </Description>
        </div>
        <div>
          <h1>{userInfo.userId}님의 최신 포스트</h1>
          <PostCard post={userInfo.Posts} used="USER" />
        </div>
      </Container>
    )
  );
};

User.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    payload: context.query.id
  });
};

export default User;

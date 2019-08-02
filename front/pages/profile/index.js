import React, { useEffect, useCallback } from "react";
import { List, Button, Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST
} from "../../reducers/user";
// 팔로워 삭제는 보류
const Profile = () => {
  const dispatch = useDispatch();
  const { loadUserData, followingList, followerList } = useSelector(
    state => state.user
  );
  const onFollow = useCallback(
    userId => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        payload: userId
      });
    },
    []
  );
  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        payload: userId
      });
    },
    []
  );
  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      payload: loadUserData.id
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      payload: loadUserData.id
    });
  }, []);
  return (
    <div>
      <List
        grid={{ gutter: 4, xs: 2, md: 5 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={followerList}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card
              actions={[
                !followingList.find(v => v.id === item.id) && (
                  <Button onClick={onFollow(item.id)}>FOLLOW</Button>
                )
              ]}
              title={
                <div style={{ textAlign: "center" }}>
                  {item.thumbnail === "none" ? (
                    <Avatar
                      icon="user"
                      style={{
                        width: "100%",
                        height: "180px",
                        fontSize: 150
                      }}
                    />
                  ) : (
                    <img
                      src={`http://localhost:3001/${item.thumbnail}`}
                      alt="..."
                      style={{
                        width: "100%",
                        height: "180px",
                        borderRadius: "50%"
                      }}
                    />
                  )}
                </div>
              }
            >
              <Card.Meta
                description={
                  <div>
                    <div style={{ fontSize: "20px", textAlign: "center" }}>
                      {item.userId}
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginTop: "25px" }}
        grid={{ gutter: 4, xs: 2, md: 5 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={followingList}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card
              actions={[
                <Button onClick={onUnfollow(item.id)}>UNFOLLOW</Button>
              ]}
              title={
                <div style={{ textAlign: "center" }}>
                  {item.thumbnail === "none" ? (
                    <Avatar
                      icon="user"
                      style={{
                        width: "100%",
                        height: "180px",
                        fontSize: 150
                      }}
                    />
                  ) : (
                    <img
                      src={`http://localhost:3001/${item.thumbnail}`}
                      alt="..."
                      style={{
                        width: "100%",
                        height: "180px",
                        borderRadius: "50%"
                      }}
                    />
                  )}
                </div>
              }
            >
              <Card.Meta
                description={
                  <div>
                    <div style={{ fontSize: "20px", textAlign: "center" }}>
                      {item.userId}
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Profile;

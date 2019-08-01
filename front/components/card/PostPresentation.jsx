import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Icon, Avatar } from "antd";
import Link from "next/link";
import TextareaAutosize from "react-autosize-textarea";
import PostImages from "../PostImages";

const PostPresentation = ({
  post,
  likeCount,
  commentCount,
  loadUserData,
  isAddComment,
  isLike,
  isFollowing,
  commentRef,
  mapToDescription,
  mapToComment,
  mapToAddComment,
  onLike,
  onSubmit,
  onRetweet,
  onFollow,
  onUnfollow
}) => (
  <Card
    cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
    title={post.RetweetId ? `${post.User.userId}님이 리트윗하셨습니다.` : null}
    extra={
      post.RetweetId &&
      loadUserData !== post.UserId &&
      (isFollowing ? (
        <Button onClick={onUnfollow(post.User.id)}>UNFOLLOW</Button>
      ) : (
        <Button onClick={onFollow(post.User.id)}>FOLLOW</Button>
      ))
    }
    actions={
      !post.RetweetId && [
        <>
          <Icon
            type="heart"
            onClick={onLike}
            style={{ cursor: "pointer", fontSize: "30px" }}
            theme={isLike ? "filled" : "outlined"}
          />
          <span style={{ fontSize: "25px", marginLeft: "5px" }}>
            {likeCount}
          </span>
        </>,
        <Icon
          type="retweet"
          onClick={onRetweet}
          style={{ cursor: "pointer", fontSize: "30px" }}
        />,
        <Icon type="ellipsis" style={{ cursor: "pointer", fontSize: "30px" }} />
      ]
    }
  >
    {post.RetweetId && post.Retweet ? (
      <Card
        cover={
          post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />
        }
      >
        <Card.Meta
          avatar={
            <Link
              href={{ pathname: "/user", query: { id: post.Retweet.User.id } }}
              as={`/user/${post.Retweet.User.id}`}
            >
              <a>
                <Avatar
                  src={`http://localhost:3001/${post.Retweet.User.thumbnail}`}
                  style={{ width: "50px", height: "50px" }}
                />
              </a>
            </Link>
          }
          title={post.Retweet.User.userId}
          description={
            <p>
              {mapToDescription.call(
                this,
                post.Retweet.content.split(/(#[^\s]+)/g)
              )}
            </p>
          }
        />
      </Card>
    ) : (
      <Card.Meta
        title={
          <div>
            <div style={{ float: "left" }}>제목: {post.title}</div>
            <div style={{ float: "right" }}>
              {post.createdAt.replace("T", " ").substring(0, 19)}
            </div>
          </div>
        }
        description={
          <>
            <p>
              {mapToDescription.call(this, post.content.split(/(#[^\s]+)/g))}
            </p>
            <div>
              작성자: &nbsp;
              <Link
                href={{ pathname: "/user", query: { id: post.User.id } }}
                as={`/user/${post.User.id}`}
              >
                <a>{post.User.userId}</a>
              </Link>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div>댓글 목록({commentCount})</div>
              <div>{mapToComment.call(this, post)}</div>
              <div>{mapToAddComment.call(this)}</div>
              <form onSubmit={onSubmit}>
                <div style={{ position: "relative" }}>
                  <TextareaAutosize
                    ref={commentRef}
                    placeholder="댓글을 입력하세요."
                    style={{
                      float: "left",
                      width: "85%",
                      fontSize: "18px",
                      border: "1px solid lightgray"
                    }}
                  />
                  <Button
                    htmlType="submit"
                    loading={isAddComment}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "15%",
                      borderRadius: 0
                    }}
                  >
                    작성
                  </Button>
                </div>
              </form>
            </div>
          </>
        }
      />
    )}
  </Card>
);

export default PostPresentation;

PostPresentation.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    UserId: PropTypes.number,
    User: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      thumbnail: PropTypes.string
    }),
    Likers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number
      })
    ).isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
      .isRequired,
    RetweetId: PropTypes.number,
    Retweet: PropTypes.shape({
      Images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
        .isRequired,
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
        thumbnail: PropTypes.string
      }),
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  }),
  likeCount: PropTypes.number,
  commentCount: PropTypes.number.isRequired,
  loadUserData: PropTypes.number.isRequired,
  isAddComment: PropTypes.bool.isRequired,
  isLike: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  commentRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({ current: PropTypes.elementType })
  ]),
  mapToDescription: PropTypes.func.isRequired,
  mapToComment: PropTypes.func.isRequired,
  mapToAddComment: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired
};

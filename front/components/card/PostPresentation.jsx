import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Icon, Avatar, Popover } from "antd";
import Link from "next/link";
import PostImages from "../PostImages";
import {
  CommentSubmit,
  CommentContainer,
  CommentTextArea,
  PostTitle
} from "./PostStyledComponent";
// 현재 loadUserData는 id값만 가지고 있음.
const PostPresentation = ({
  post,
  used,
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
  onUnfollow,
  onRemovePost
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
      used !== "USER" &&
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
        <Popover
          key="ellipsis"
          content={
            <Button.Group>
              {post.UserId === loadUserData ? (
                <>
                  <Button>수정</Button>
                  <Button type="danger" onClick={onRemovePost(post.id)}>
                    삭제
                  </Button>
                </>
              ) : (
                <Button>신고</Button>
              )}
            </Button.Group>
          }
        >
          <Icon type="ellipsis" />
        </Popover>
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
          <PostTitle>
            <div itemScope="title">제목: {post.title}</div>
            <div>{post.createdAt.replace("T", " ").substring(0, 19)}</div>
          </PostTitle>
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
            <CommentContainer>
              <div>댓글 목록({commentCount})</div>
              <div>{mapToComment.call(this, post)}</div>
              <div>{mapToAddComment.call(this)}</div>
              <form onSubmit={onSubmit}>
                <div style={{ position: "relative" }}>
                  <CommentTextArea
                    ref={commentRef}
                    placeholder="댓글을 입력하세요."
                  />
                  <CommentSubmit htmlType="submit" loading={isAddComment}>
                    작성
                  </CommentSubmit>
                </div>
              </form>
            </CommentContainer>
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
  used: PropTypes.string,
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
  onUnfollow: PropTypes.func.isRequired,
  onRemovePost: PropTypes.func.isRequired
};
